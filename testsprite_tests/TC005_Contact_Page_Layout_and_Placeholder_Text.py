import asyncio
from playwright import async_api

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # Click on the Contact page link to navigate to the Contact page
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/nav/ul/li[5]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Resize viewport to mobile viewport and verify if the title and placeholder text remain visible and centered or left-aligned
        await page.goto('http://localhost:3000/contact', timeout=10000)
        

        await page.mouse.wheel(0, window.innerHeight)
        

        # Assert the Contact page title is centered and contains the text 'Contact'
        title_locator = page.locator('h1, h2, h3, h4, h5, h6').filter(has_text='Contact')
        assert await title_locator.count() > 0, 'Contact title not found'
        title_box = await title_locator.bounding_box()
        viewport_size = await page.viewport_size()
        assert title_box is not None, 'Title bounding box not found'
        title_center_x = title_box['x'] + title_box['width'] / 2
        viewport_center_x = viewport_size['width'] / 2
        assert abs(title_center_x - viewport_center_x) < 10, 'Title is not centered horizontally'
        # Assert placeholder text 'Content coming soon!' is visible and centered
        placeholder_locator = page.locator('text=Content coming soon!')
        assert await placeholder_locator.is_visible(), 'Placeholder text not visible'
        placeholder_box = await placeholder_locator.bounding_box()
        assert placeholder_box is not None, 'Placeholder bounding box not found'
        placeholder_center_x = placeholder_box['x'] + placeholder_box['width'] / 2
        assert abs(placeholder_center_x - viewport_center_x) < 10, 'Placeholder text is not centered horizontally'
        # Check layout on desktop viewport
        await page.set_viewport_size({'width': 1280, 'height': 800})
        # Confirm layout is centered and visually balanced by checking title and placeholder centering again
        title_box = await title_locator.bounding_box()
        placeholder_box = await placeholder_locator.bounding_box()
        assert title_box is not None and placeholder_box is not None, 'Bounding boxes not found after resize to desktop'
        title_center_x = title_box['x'] + title_box['width'] / 2
        placeholder_center_x = placeholder_box['x'] + placeholder_box['width'] / 2
        viewport_size = await page.viewport_size()
        viewport_center_x = viewport_size['width'] / 2
        assert abs(title_center_x - viewport_center_x) < 10, 'Title not centered on desktop viewport'
        assert abs(placeholder_center_x - viewport_center_x) < 10, 'Placeholder not centered on desktop viewport'
        # Resize viewport to mobile viewport
        await page.set_viewport_size({'width': 375, 'height': 667})
        # Confirm layout remains centered and placeholder text is fully visible
        title_box = await title_locator.bounding_box()
        placeholder_box = await placeholder_locator.bounding_box()
        assert title_box is not None and placeholder_box is not None, 'Bounding boxes not found after resize to mobile'
        title_center_x = title_box['x'] + title_box['width'] / 2
        placeholder_center_x = placeholder_box['x'] + placeholder_box['width'] / 2
        viewport_size = await page.viewport_size()
        viewport_center_x = viewport_size['width'] / 2
        assert abs(title_center_x - viewport_center_x) < 10, 'Title not centered on mobile viewport'
        assert abs(placeholder_center_x - viewport_center_x) < 10, 'Placeholder not centered on mobile viewport'
        assert await placeholder_locator.is_visible(), 'Placeholder text not visible on mobile viewport'
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    