# HemoLink — Blood Logistics & Donor Ecosystem

A concise project README describing the HemoLink ecosystem: a complete blood logistics, hospital, and donor platform focused on safety, traceability, and real-world operational robustness. This repo contains the frontend and backend components used for the demo.

## Project Summary

HemoLink is an end-to-end blood management ecosystem that combines intelligent logistics, hospital/admin operations, donor engagement, and strong privacy & reliability guardrails. The system was designed to demonstrate operational innovation (the "Core Logic") while meeting real-world compliance and usability requirements ("Standard Compliance").

---

## Key Highlights

- **Core Logic (innovation that wins points):** FIFO auto-balancing, geo-routing to solve "blood deserts", cold-chain sentinel for temperature locking and auto-transfers to avoid wastage.
- **Standard Compliance (real-world readiness):** Vein-to-vein traceability, RBAC, offline/disaster mode, and zero-knowledge partner visibility.

---

## Modules & Features

### Module 1 — Smart Logistics (The Winner)

- **FIFO Auto-Balancing**
	- Logic: Blood bags are automatically sorted by expiry date.
	- Action: If a bag is within 5 days of expiry and unused, the system auto-creates a "Transfer Request" to a nearby high-volume trauma center to minimize wastage.

- **"Blood Desert" Geo-Routing**
	- Logic: On request from a rural clinic, the algorithm finds the nearest bank with surplus units based on travel time (not just distance), reserves the needed unit, and issues routing instructions.

- **Cold Chain Sentinel (IoT Simulation)**
	- Logic: Monitors fridge/storage temperature. If temperature rises above 10°C the dashboard flashes **RED** and the system locks digital IDs of all bags in that fridge so they cannot be issued.

### Module 2 — Hospital / Admin Dashboard (The User)

- **Vein-to-Vein Traceability**
	- Visual timeline for every blood bag: Donated → Tested → Component Separated → Stored → Dispatched → Transfused. (Supports regulatory/NABH traceability requirements.)

- **Zero-Knowledge Partner Network**
	- Hospitals can view available quantities at partner hospitals (e.g., "City Hospital: 5 A+ units") while donor/patient identities remain hidden.

- **Digital Component Splitter**
	- Log one Whole Blood donation and the system auto-creates inventory assets for Red Cells, Plasma, and Platelets with their respective expiry rules (e.g., Red Cells ~35 days, Platelets ~5 days).

### Module 3 — Donor & Public App (The Interface)

- **Live Urgency Map**
	- Donors see a live map with shortage zones highlighted (Critical zones turn **Red**), encouraging targeted donations.

- **Replacement Breaker (Credit Swap)**
	- Families can bring any eligible donor (e.g., O+) and the system will release a reserved unit (e.g., A+) in exchange via a credit-swap mechanism.

- **Digital Donor Card (QR)**
	- Shows blood group and last-donated date. The QR scanner flags donors as "Ineligible" if they attempt to donate again within 3 months.

### Module 4 — Security & Tech (The Guardrails)

- **Role-Based Access Control (RBAC)**
	- Receptionist: Can view donor name & appointment
	- Lab Tech: Can view blood bag ID & test results (no donor name)
	- Doctor: Can view full medical history

- **Offline "Disaster" Mode**
	- App switches to a local DB when connectivity is lost, allowing emergency issuing; changes auto-sync when connection is restored.

---

## Demo Script — What to show the judges

Focus on three high-impact flows rather than trying to demo every feature:

1. **The "Wastage" Fix**
	 - Show dashboard with a "Risk of Expiry" warning for near-expiry units.
	 - Click a button to "Transfer to City Hospital" and show the risk meter drop and the unit transfer in the timeline.

2. **The "Safety" Lock**
	 - In the admin panel, simulate a fridge temperature input of `12°C`.
	 - Show the dashboard instantly marking the fridge **DO NOT USE**, locking bag IDs and preventing issuance.

3. **The "Privacy" Share**
	 - Show Hospital A viewing Hospital B's stock: hover to see "5 Units Available" but attempt to click patient/donor details and show "Access Denied" or redacted details.

---

## Repo Layout (high level)

- `frontend/` — React UI (components, pages, donor map, admin dashboards)
- `backend/` — Python server and API (inventory logic, transfer engine, offline sync simulation)
- `tests/` — test scaffolding

---

## Quick Notes for Judges

- The emphasis is on an operational ecosystem: logistics algorithms + strong privacy and offline resilience.
- The three demo flows are designed to be concise, repeatable, and persuasive.

---

