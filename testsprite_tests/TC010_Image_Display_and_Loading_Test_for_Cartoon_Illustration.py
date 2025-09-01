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
        # Test image display on desktop, tablet, and mobile viewports to verify centering and quality
        await page.mouse.wheel(0, window.innerHeight)
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/nav/ul/li/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/nav/ul/li/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Test image display on mobile viewport and simulate slow network or failed image load to verify fallback or alt text
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/nav/ul/li/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/nav/ul/li/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Simulate slow network or failed image load to verify fallback or alt text display
        await page.goto('http://localhost:3000/slow-network-test', timeout=10000)
        

        # Assertion: Verify cartoon1.png image is displayed
        image_locator = page.locator('img[alt="Cartoon illustration background"]')
        assert await image_locator.count() == 1, 'Cartoon image not found on homepage'
        assert await image_locator.is_visible(), 'Cartoon image is not visible on homepage'
        
        # Assertion: Verify image is horizontally and vertically centered within hero section
        hero_section = page.locator('section.hero')
        image_box = await image_locator.bounding_box()
        hero_box = await hero_section.bounding_box()
        assert image_box is not None and hero_box is not None, 'Bounding box not found for image or hero section'
        image_center_x = image_box['x'] + image_box['width'] / 2
        image_center_y = image_box['y'] + image_box['height'] / 2
        hero_center_x = hero_box['x'] + hero_box['width'] / 2
        hero_center_y = hero_box['y'] + hero_box['height'] / 2
        tolerance = 5  # pixels
        assert abs(image_center_x - hero_center_x) <= tolerance, 'Image is not horizontally centered in hero section'
        assert abs(image_center_y - hero_center_y) <= tolerance, 'Image is not vertically centered in hero section'
        
        # Assertion: Verify image quality remains consistent and no distortion occurs on resizing
        # Check aspect ratio consistency across viewports
        aspect_ratio = image_box['width'] / image_box['height']
        viewports = [(1280, 720), (768, 1024), (375, 667)]  # desktop, tablet, mobile
        for width, height in viewports:
            await page.set_viewport_size({'width': width, 'height': height})
            await page.wait_for_timeout(1000)  # wait for resize effect
            resized_box = await image_locator.bounding_box()
            assert resized_box is not None, 'Image bounding box not found after resize'
            resized_aspect_ratio = resized_box['width'] / resized_box['height']
            ratio_diff = abs(resized_aspect_ratio - aspect_ratio)
            assert ratio_diff < 0.05, f'Image aspect ratio changed significantly on resize: {ratio_diff}'
            assert await image_locator.is_visible(), 'Image not visible after resize'
            # Optionally check naturalWidth and naturalHeight for quality
            natural_width = await page.evaluate('(img) => img.naturalWidth', image_locator)
            natural_height = await page.evaluate('(img) => img.naturalHeight', image_locator)
            assert natural_width > 0 and natural_height > 0, 'Image natural dimensions invalid'
            # Check that natural aspect ratio matches bounding box aspect ratio within tolerance
            natural_aspect_ratio = natural_width / natural_height
            assert abs(natural_aspect_ratio - resized_aspect_ratio) < 0.05, 'Image natural aspect ratio differs from displayed aspect ratio'
        
        # Assertion: Verify appropriate fallback or alt text is shown if image fails to load
        # Simulate image load failure by intercepting request and aborting
        async def intercept_route(route):
            if 'cartoon1.png' in route.request.url:
                await route.abort()
            else:
                await route.continue_()
        await page.route('**/*', intercept_route)
        await page.reload()
        # Check that alt text is visible or fallback is shown
        alt_text_visible = await page.locator('img[alt="Cartoon illustration background"]:not([src])').is_visible()
        assert alt_text_visible or await image_locator.is_visible() == False, 'Fallback or alt text not shown when image fails to load'
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    