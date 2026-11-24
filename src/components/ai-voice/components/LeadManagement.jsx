import React from "react";
import VoiceSectionTitle from "./VoiceSectionTitle";

const LeadManagement = () => {
  return (
    <section className="lead-management-section">
      <VoiceSectionTitle eyebrow="LEAD MANAGEMENT">
        Turn Conversations Into Customers.
      </VoiceSectionTitle>

      <div className="lead-management-table">
        <div className="lead-row lead-header">
          <span>Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Status</span>
        </div>

        <div className="lead-row">
          <span>John Smith</span>
          <span>john@example.com</span>
          <span>+1 555 123 456</span>
          <span>New Lead</span>
        </div>

        <div className="lead-row">
          <span>Sarah Wilson</span>
          <span>sarah@example.com</span>
          <span>+1 555 987 654</span>
          <span>Contacted</span>
        </div>
      </div>
    </section>
  );
};

export default LeadManagement;