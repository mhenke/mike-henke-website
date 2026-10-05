---
title: Found an SMTP spoofing gap with Python
date: '2025-01-15'
author: Mike Henke
layout: layouts/post.njk
categories:
  - Python
  - Security
  - Automation
excerpt: >-
  I used Python to find an SMTP spoofing vulnerability in our email setup and got it closed in two weeks. The code was the easy part.
---

I used Python to find an SMTP spoofing vulnerability in our email setup and got it closed in two weeks. The code was the easy part.

Here is the short version. Our internal audit team was reviewing CIS v7 controls. One of the controls checks whether a mail server accepts spoofed sender addresses. I asked the network team if we had that covered. They said yes. I asked for proof. They pointed me at a config. I read the config. The config only checked one of <a href="https://en.wikipedia.org/wiki/Sender_Policy_Framework">SPF</a>, <a href="https://en.wikipedia.org/wiki/DomainKeys_Identified_Mail">DKIM</a>, and <a href="https://en.wikipedia.org/wiki/DMARC">DMARC</a>. Not all three.

So I wrote a Python script that sends a test email with a forged sender header to our own mail server and checks whether it lands in the inbox or gets rejected.

<strong>The script in about 40 lines.</strong>

```python
import smtplib
from email.mime.text import MIMEText

msg = MIMEText("This is a spoof test. If you got this, we have a gap.")
msg["Subject"] = "SMTP Spoof Test - do not reply"
msg["From"] = "ceo@our-company.com"
msg["To"] = "security-team@our-company.com"

with smtplib.SMTP("mail.our-company.com", 25) as server:
    server.send_message(msg)
```

The email landed in the inbox. I then sent a version with a spoofed domain we don't own at all. Also landed. Our mail server was checking SPF on incoming mail but not applying it to internal-to-internal traffic. Short version of a longer conversation: the gap was a gap in how the DMARC policy was enforced on internal relays. The <a href="https://datatracker.ietf.org/doc/html/rfc7208">RFC</a> allows this kind of thing depending on how you read it.

I documented the find, sent it to the network security team, and two weeks later they had the DMARC policy tightened and a monitoring rule in place. The Python script is now part of our internal test suite, run quarterly.

I learned two things from this. One, <strong>don't take "we have that covered" at face value</strong> without asking to see the evidence. Two, a simple script and a clear finding gets you further than a long security report. The network team knew their mail infrastructure. They just needed someone to demonstrate the gap in terms they could reproduce.

This was during my time in the IT audit group in 2024. I was working through the Cybersecurity Certificate at UNO at the same time, and the CIS control framework came up regularly in class. The theory and the practice lined up for once.

Thoughts? Have you found a similar gap by testing an assumption instead of trusting a config?
