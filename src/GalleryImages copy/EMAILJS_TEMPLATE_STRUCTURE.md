# EmailJS Template Structure for Contact Form

## Overview

Your contact form sends **4 variables** to EmailJS. Here's exactly how to structure your template.

---

## Variables Being Sent

Based on your `Contact.jsx` code, these are the variables being sent:

1. `{{from_name}}` - The visitor's name
2. `{{from_email}}` - The visitor's email address
3. `{{subject}}` - The subject line
4. `{{message}}` - The message content

---

## Step-by-Step: Creating the Template

### Step 1: Go to EmailJS Dashboard
1. Go to https://dashboard.emailjs.com/
2. Sign in to your account
3. Click **Email Templates** in the left sidebar
4. Click **Create New Template**

---

### Step 2: Template Settings

**Template Name:**
```
Contact Form - MadreTierra
```

**Service:** Select your email service (Gmail, Outlook, etc.)

---

### Step 3: Email Content Structure

#### Option A: Simple Professional Format (Recommended)

**Subject Line:**
```
New Contact Form Submission: {{subject}}
```

**Email Body:**
```
Hello,

You have received a new message from the MadreTierra Cigars contact form.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This email was sent from the MadreTierra Cigars website contact form.
```

---

#### Option B: HTML Format (More Styling Options)

**Subject Line:**
```
New Contact Form Submission: {{subject}}
```

**Email Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #8B4513; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #8B4513; }
    .message-box { background-color: white; padding: 15px; border-left: 4px solid #8B4513; margin-top: 15px; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
      <p>MadreTierra Cigars</p>
    </div>
    
    <div class="content">
      <div class="field">
        <span class="label">From:</span> {{from_name}}
      </div>
      
      <div class="field">
        <span class="label">Email:</span> {{from_email}}
      </div>
      
      <div class="field">
        <span class="label">Subject:</span> {{subject}}
      </div>
      
      <div class="message-box">
        <div class="label">Message:</div>
        <div style="margin-top: 10px; white-space: pre-wrap;">{{message}}</div>
      </div>
    </div>
    
    <div class="footer">
      This email was sent from the MadreTierra Cigars website contact form.
    </div>
  </div>
</body>
</html>
```

---

#### Option C: Plain Text Format (Simplest)

**Subject Line:**
```
Contact Form: {{subject}}
```

**Email Body:**
```
New contact form submission from MadreTierra Cigars website.

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from MadreTierra Cigars contact form
```

---

## Important: Variable Names Must Match Exactly

⚠️ **CRITICAL:** The variable names in your template MUST match exactly:

- `{{from_name}}` ✅ (correct)
- `{{fromName}}` ❌ (wrong - no underscore)
- `{{from_name }}` ❌ (wrong - extra space)
- `{{FROM_NAME}}` ❌ (wrong - uppercase)

**Use exactly these:**
- `{{from_name}}`
- `{{from_email}}`
- `{{subject}}`
- `{{message}}`

---

## Step 4: Reply-To Configuration

**Important:** Set the Reply-To field so you can reply directly to the visitor:

1. In the template editor, find **Reply To** field
2. Enter: `{{from_email}}`

This way, when you click "Reply" in your email client, it will automatically reply to the visitor's email address.

---

## Step 5: Test Your Template

1. Click **Save** on your template
2. Use the **Test** button to send a test email
3. Fill in test values:
   - from_name: "Test User"
   - from_email: "test@example.com"
   - subject: "Test Subject"
   - message: "This is a test message"
4. Check your email to verify it looks correct

---

## Step 6: Copy Your Template ID

After saving:
1. You'll see your **Template ID** (looks like: `template_abc123`)
2. Copy this ID
3. Add it to Vercel as: `VITE_EMAILJS_TEMPLATE_ID`

---

## Quick Reference Checklist

When creating your template, make sure:

- [ ] Template name is set
- [ ] Service is selected
- [ ] Subject line includes `{{subject}}`
- [ ] Email body includes all 4 variables:
  - [ ] `{{from_name}}`
  - [ ] `{{from_email}}`
  - [ ] `{{subject}}`
  - [ ] `{{message}}`
- [ ] Reply-To is set to `{{from_email}}`
- [ ] Template is saved
- [ ] Template ID is copied

---

## Example: What the Email Will Look Like

When someone fills out your contact form with:
- Name: "John Smith"
- Email: "john@example.com"
- Subject: "Question about cigars"
- Message: "I'm interested in learning more about your premium cigars."

**You'll receive an email like:**

```
Subject: New Contact Form Submission: Question about cigars

Hello,

You have received a new message from the MadreTierra Cigars contact form.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

From: John Smith
Email: john@example.com
Subject: Question about cigars

Message:
I'm interested in learning more about your premium cigars.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This email was sent from the MadreTierra Cigars website contact form.
```

---

## Troubleshooting

**Email not receiving variables?**
- Check that variable names match exactly (case-sensitive, no extra spaces)
- Make sure you're using double curly braces: `{{variable_name}}`

**Reply-To not working?**
- Set Reply-To field to: `{{from_email}}`
- Some email providers may require additional configuration

**Template not sending?**
- Verify your Service is active and connected
- Check that your template is saved and active
- Test the template using the Test button first

