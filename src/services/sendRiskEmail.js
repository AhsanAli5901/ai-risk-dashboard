import emailjs from "@emailjs/browser";

export const sendRiskEmail = async (risk) => {
  if (!risk || !risk.id) {
    console.warn("Invalid risk data, email not sent.");
    return;
  }
  try {
    console.log("📧 Sending email for risk:", risk.id);
    
    const templateParams = {
      risk_id: risk.id,
      risk_name: risk.name,
      priority: risk.priority,
      score: risk.score,
      category: risk.category,
      owner: risk.owner,
      threat: risk.threat,
      summary: `${risk.name} has been assessed as a ${risk.priority} risk with a score of ${risk.score}. This risk presents a significant operational concern and requires immediate escalation.`,
      timestamp: new Date().toLocaleString(),
    };

    const result = await emailjs.send(
      "service_gpwcqxg",
      "template_0ic0v3g",
      templateParams,
      "iUGMA4ul0twfCoNWP",
    );

    console.log("Email sent successfully:", result.text);
    return result;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};
