import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

# We will use dummy values for now as requested by user
SMTP_USERNAME = os.getenv("SMTP_USERNAME", "example@gmail.com")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "dummy_password")
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))

def send_alert_email(to_email: str, location: str, risk_percentage: float):
    if SMTP_PASSWORD == "dummy_password":
        print(f"Skipping actual email send to {to_email}. Dummy credentials in use. High Risk Alert for {location} ({risk_percentage}%)")
        return

    try:
        msg = MIMEMultipart()
        msg['From'] = SMTP_USERNAME
        msg['To'] = to_email
        msg['Subject'] = f"🔥 Wildfire Risk Alert: High Danger in {location}"

        body = f"""
        Hello,
        
        This is an automated alert from the Wildfire Predictor App.
        
        We have detected a HIGH wildfire risk for your saved location: {location}.
        
        Risk Level: {risk_percentage}%
        
        Please take necessary precautions and stay safe.
        """
        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        text = msg.as_string()
        server.sendmail(SMTP_USERNAME, to_email, text)
        server.quit()
        print(f"Alert email sent successfully to {to_email} for {location}")
    except Exception as e:
        print(f"Failed to send alert email: {e}")
