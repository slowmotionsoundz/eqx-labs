# Graph Report - eqxxx  (2026-06-18)

## Corpus Check
- 36 files · ~143,307 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 295 nodes · 320 edges · 36 communities (29 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `189e0abc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]

## God Nodes (most connected - your core abstractions)
1. `refreshData()` - 14 edges
2. `Global Instructions: EQ Labs AI Partner` - 8 edges
3. `Working Preferences` - 7 edges
4. `EQ Labs Europe Brand Voice` - 7 edges
5. `renderDashboardTab()` - 6 edges
6. `createBookingRecord()` - 5 edges
7. `initCRM()` - 5 edges
8. `renderFileReviewTab()` - 5 edges
9. `Firebase Setup Guide` - 5 edges
10. `Project Roadmap` - 5 edges

## Surprising Connections (you probably didn't know these)
- `createBookingRecord()` --calls--> `saveToFirestore()`  [EXTRACTED]
  js/crm.js → js/firebase-db.js
- `renderSettingsTab()` --calls--> `subscribeToAdmins()`  [EXTRACTED]
  js/crm.js → js/auth.js

## Communities (36 total, 7 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.04
Nodes (42): booking, bookingTask, cancelBtn, checkedBoxes, cleanedRoom, clientNameEl, closeBtn, contact (+34 more)

### Community 1 - "Community 1"
Cohesion: 0.1
Nodes (19): calendar, contactRef, db, { defineSecret }, endTime, eventToInsert, financialRef, { getFirestore } (+11 more)

### Community 2 - "Community 2"
Cohesion: 0.13
Nodes (12): addAdminUser(), auth, db, firebaseConfig, initAuthGate(), logoutUser(), monitorAuthState(), removeAdminUser() (+4 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (17): subscribeToAdmins(), populateClientDropdown(), refreshData(), renderCalendarTab(), renderContactDetailsPane(), renderContactsList(), renderContactsTab(), renderFinancialListItems() (+9 more)

### Community 4 - "Community 4"
Cohesion: 0.15
Nodes (11): initHero(), initHexGrid(), initLocations(), initMission(), initRoomSlider(), header, heroContainer, hexGridContainer (+3 more)

### Community 5 - "Community 5"
Cohesion: 0.15
Nodes (5): app, auth, db, firebaseConfig, storage

### Community 6 - "Community 6"
Cohesion: 0.2
Nodes (9): closeLeadBtn, closeProjBtn, leadModal, openLeadBtn, projModal, success, initCRM(), setupFirebaseListeners() (+1 more)

### Community 7 - "Community 7"
Cohesion: 0.2
Nodes (9): 1. Create a Firebase Project, 2. Register Web App, 3. Enable Services, 4. Add Configuration to Project, Authentication, code:javascript (/* Placeholder for your Firebase Config */), Firebase Setup Guide, Firestore Database (+1 more)

### Community 8 - "Community 8"
Cohesion: 0.2
Nodes (9): 1. Create a Firebase Project, 2. Register Web App, 3. Enable Services, 4. Add Configuration to Project, Authentication, code:javascript (/* Placeholder for your Firebase Config */), Firebase Setup Guide, Firestore Database (+1 more)

### Community 9 - "Community 9"
Cohesion: 0.22
Nodes (8): createBookingRecord(), saveLocalState(), showNotification(), app, db, deleteFromFirestore(), firebaseConfig, saveToFirestore()

### Community 10 - "Community 10"
Cohesion: 0.22
Nodes (8): Communication & Tone, Content Principles, Core Competencies, Forbidden Vocabulary, Global Instructions: EQ Labs AI Partner, Output Structure, Role, Style for Scripts & Media

### Community 11 - "Community 11"
Cohesion: 0.22
Nodes (8): Claymorphism & 3D Shading (Tactile Neumorphism), code:css (.clay-card {), code:css (.clay-inset {), Color Palette (Sleek & Warm Pastels), Design System - Scandinavian Claymorphism, Inset Active Elements (Buttons, Inputs, Toggle Channels), Outset Panels, Typography

### Community 12 - "Community 12"
Cohesion: 0.25
Nodes (7): Communication & Tone, Content Creation, General Rules, Handling Ambiguity, Output Format, Working Preferences, YouTube & Scripting

### Community 13 - "Community 13"
Cohesion: 0.25
Nodes (7): 1. Identity & Tone, 2. Content Structure, 3. Writing Rules, 4. Content Principles, 5. Vocabulary, 6. Visual & Layout Style, EQ Labs Europe Brand Voice

### Community 14 - "Community 14"
Cohesion: 0.47
Nodes (4): endTour(), nextStep(), renderStep(), tourSteps

### Community 15 - "Community 15"
Cohesion: 0.33
Nodes (5): Phase 1: Foundation & Brand (Completed), Phase 2: Backend & Persistence (Current), Phase 3: Advanced Features (Planned), Phase 4: Optimization & Launch, Project Roadmap

### Community 16 - "Community 16"
Cohesion: 0.33
Nodes (5): Digital Engineering & Development, EQ Labs Europe, Facilities & Performance, Heritage & Design, Marketing & Travel

### Community 17 - "Community 17"
Cohesion: 0.33
Nodes (5): Phase 1: Foundation & Brand (Completed), Phase 2: Backend & Persistence (Current), Phase 3: Advanced Features (Planned), Phase 4: Optimization & Launch, Project Roadmap

### Community 18 - "Community 18"
Cohesion: 0.4
Nodes (4): dom, fs, html, jsdom

### Community 19 - "Community 19"
Cohesion: 0.4
Nodes (5): renderAlertItems(), renderBarReport(), renderCircularGauge(), renderDashboardTab(), renderPastDueInvoices()

### Community 20 - "Community 20"
Cohesion: 0.4
Nodes (4): Force Per4mance - Elite Football Academy, Getting Started, Project Structure, Tech Stack

### Community 21 - "Community 21"
Cohesion: 0.4
Nodes (4): Force Per4mance - Elite Football Academy, Getting Started, Project Structure, Tech Stack

### Community 22 - "Community 22"
Cohesion: 0.5
Nodes (3): fs, html, scriptMatch

### Community 23 - "Community 23"
Cohesion: 0.5
Nodes (4): renderCommentsTimeline(), renderFileReviewTab(), renderPrototypeMarkers(), renderTimelineMarkerFlags()

### Community 24 - "Community 24"
Cohesion: 0.5
Nodes (3): Layouts & Structure, Modern Web Guidance, Motion & Interactive States

### Community 25 - "Community 25"
Cohesion: 0.5
Nodes (3): Configuration, Firebase Integration Guidance, Operations

## Knowledge Gaps
- **156 isolated node(s):** `fs`, `jsdom`, `html`, `dom`, `fs` (+151 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initCRM()` connect `Community 6` to `Community 0`, `Community 3`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `refreshData()` connect `Community 3` to `Community 0`, `Community 33`, `Community 6`, `Community 9`, `Community 19`, `Community 23`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **What connects `fs`, `jsdom`, `html` to the rest of the system?**
  _156 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.04 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._