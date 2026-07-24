/**
 * @file Data module for EQX Admin CRM.
 * Manages core data structures, initial defaults, and localStorage persistence.
 */

export const defaultLeads = [
  { id: "l1", firstName: "Eva", lastName: "Robinson", company: "Alabama Machinery & Supply", dealValue: 21300, status: "contacted", email: "eva.robinson@alabamamachinery.com" },
  { id: "l2", firstName: "Christian", lastName: "Bass", company: "Nordic Operations Group", dealValue: 12350, status: "new", email: "c.bass@nordicops.se" },
  { id: "l3", firstName: "Helna", lastName: "Julie", company: "Skania Creative Hub", dealValue: 45000, status: "qualified", email: "helna@skaniacreative.dk" },
  { id: "l4", firstName: "Brandon", lastName: "Crawford", company: "Huntsville Ventures", dealValue: 8500, status: "contacted", email: "b.crawford@huntsvilleventures.com" }
];

export const defaultProjects = [
  { id: "p1", title: "Web Logistics Dashboard", clientName: "Eva Robinson", category: "web-app", progress: 65 },
  { id: "p2", title: "Nordic Ops Podcast Launch", clientName: "Christian Bass", category: "audio-media", progress: 48 }
];

export const defaultContacts = [
  { id: "c1", name: "Eva Robinson", email: "eva.robinson@alabamamachinery.com", phone: "+1 911 202 2313", interest: "Logistics Platform Overhaul" },
  { id: "c2", name: "Christian Bass", email: "c.bass@nordicops.se", phone: "+46 418 209 322", interest: "Broadcast & Podcast Sandbox" },
  { id: "c3", name: "Helna Julie", email: "helna@skaniacreative.dk", phone: "+45 892 019 28", interest: "Full LP Audio Mix & Media" }
];

export const defaultTasks = [
  { id: "t1", title: "Call Eva Robinson regarding logistics beta", dueDate: "June 15", assignedTo: "CPz", status: "pending" },
  { id: "t2", title: "Review Nordic Ops dashboard architecture", dueDate: "June 16", assignedTo: "Mali Boy", status: "pending" },
  { id: "t3", title: "Finalize contracts for Skania Platform", dueDate: "June 18", assignedTo: "Rz", status: "completed" }
];

export const defaultBookings = [];

export let leads    = JSON.parse(localStorage.getItem("eqx2_leads"))    || [...defaultLeads];
export let projects = JSON.parse(localStorage.getItem("eqx2_projects")) || [...defaultProjects];
export let contacts = JSON.parse(localStorage.getItem("eqx2_contacts")) || [...defaultContacts];
export let tasks    = JSON.parse(localStorage.getItem("eqx2_tasks"))    || [...defaultTasks];
export let bookings = JSON.parse(localStorage.getItem("eqx2_bookings")) || [...defaultBookings];

export function save() {
  localStorage.setItem("eqx2_leads",    JSON.stringify(leads));
  localStorage.setItem("eqx2_projects", JSON.stringify(projects));
  localStorage.setItem("eqx2_contacts", JSON.stringify(contacts));
  localStorage.setItem("eqx2_tasks",    JSON.stringify(tasks));
  localStorage.setItem("eqx2_bookings", JSON.stringify(bookings));
}
