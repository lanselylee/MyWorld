# EmailJS 设置指南

为了让 Contact 页面能够真正发送邮件到您的邮箱，您需要设置 EmailJS 服务。

## 步骤 1: 注册 EmailJS 账户

1. 访问 [EmailJS.com](https://www.emailjs.com)
2. 点击 "Sign Up" 注册免费账户
3. 验证您的邮箱地址

## 步骤 2: 添加邮件服务

1. 登录后，点击 "Email Services"
2. 点击 "Add New Service"
3. 选择您的邮件提供商（推荐 Gmail）
4. 按照指示连接您的邮箱账户
5. 记录下生成的 **Service ID**

## 步骤 3: 创建邮件模板

1. 点击 "Email Templates"
2. 点击 "Create New Template"
3. 使用以下模板内容：

```
Subject: 新的联系表单消息 - {{from_name}}

收到来自网站的新消息：

发送者：{{from_name}}
邮箱：{{from_email}}

消息内容：
{{message}}

---
此邮件来自您的个人网站联系表单
```

4. 在模板中使用以下变量：
   - `{{from_name}}` - 发送者姓名
   - `{{from_email}}` - 发送者邮箱
   - `{{message}}` - 消息内容
   - `{{to_name}}` - 接收者姓名（您的姓名）

5. 保存模板并记录下 **Template ID**

## 步骤 4: 获取公钥

1. 点击 "Account" 或 "Integration"
2. 找到 "Public Key" 部分
3. 记录下您的 **Public Key**

## 步骤 5: 配置环境变量

在项目根目录创建 `.env.local` 文件（如果还没有的话），添加以下内容：

```env
# EmailJS 配置
NEXT_PUBLIC_EMAILJS_SERVICE_ID=您的Service_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=您的Template_ID  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=您的Public_Key
```

## 步骤 6: 重启开发服务器

```bash
npm run dev
```

## 测试邮件功能

1. 访问 http://localhost:3000/contact
2. 填写表单并提交
3. 检查您的邮箱是否收到测试邮件

## 重要提示

- 确保 `.env.local` 文件已添加到 `.gitignore` 中，不要将敏感信息提交到代码库
- EmailJS 免费计划每月限制 200 封邮件
- 如需更多功能，可以升级到付费计划

## 故障排除

如果邮件发送失败：
1. 检查控制台错误信息
2. 确认 EmailJS 配置参数正确
3. 检查网络连接
4. 验证邮件服务提供商设置

配置完成后，访客就可以通过您的 Contact 页面直接发送邮件到您的邮箱了！
