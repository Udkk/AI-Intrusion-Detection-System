import streamlit as st
import pandas as pd
import time



st.set_page_config(page_title="AI Security Monitor", layout="wide")

st.title("🛡 AI-Powered Intrusion Detection Dashboard")

st.markdown("Real-Time Network Threat Monitoring System")

df = pd.read_csv("logs/attack_logs.csv")



st.subheader("🚨 Recent Network Alerts")

st.dataframe(df)

st.subheader("📊 Attack Distribution")

attack_counts = df["attack_type"].value_counts()

st.bar_chart(attack_counts)

st.subheader("⚠ High Risk Threats")

high_risk = df[df["risk"] != "LOW"]

st.table(high_risk)