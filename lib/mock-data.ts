// Mock data for the prototype

export const MOCK_BUILDINGS = [
  {
    id: "bld-001",
    name: "Sakumono Heights",
    address: "Plot 123, Sakumono, Tema, Ghana",
    units: 48,
    occupancy: 45,
    manager: "Sarah Johnson",
    currency: "GHS",
  },
  {
    id: "bld-002",
    name: "Tema Gardens",
    address: "Community 2, Tema, Ghana",
    units: 36,
    occupancy: 34,
    manager: "Michael Asante",
    currency: "GHS",
  },
  {
    id: "bld-003",
    name: "Accra Plaza",
    address: "Airport Residential, Accra, Ghana",
    units: 60,
    occupancy: 58,
    manager: "Grace Mensah",
    currency: "USD",
  },
]

export const MOCK_UNITS = [
  {
    id: "unit-001",
    building_id: "bld-001",
    number: "A101",
    floor: 1,
    bedrooms: 2,
    bathrooms: 2,
    sqm: 85,
    rent: 2500,
    status: "occupied",
    tenant_name: "John Tenant",
  },
  {
    id: "unit-002",
    building_id: "bld-001",
    number: "A102",
    floor: 1,
    bedrooms: 3,
    bathrooms: 2,
    sqm: 105,
    rent: 3200,
    status: "occupied",
    tenant_name: "Alice Cooper",
  },
  {
    id: "unit-003",
    building_id: "bld-001",
    number: "A103",
    floor: 1,
    bedrooms: 2,
    bathrooms: 1,
    sqm: 75,
    rent: 2200,
    status: "vacant",
  },
]

export const MOCK_TICKETS = [
  {
    id: "tick-001",
    unit_id: "unit-001",
    tenant_name: "John Tenant",
    category: "Plumbing",
    priority: "high",
    status: "in_progress",
    description: "Kitchen sink is leaking",
    created_at: "2025-11-10T09:30:00Z",
    assigned_to: "Fix-It Services",
  },
  {
    id: "tick-002",
    unit_id: "unit-002",
    tenant_name: "Alice Cooper",
    category: "Electrical",
    priority: "medium",
    status: "open",
    description: "Living room light fixture not working",
    created_at: "2025-11-11T14:20:00Z",
  },
]

export const MOCK_PAYMENTS = [
  {
    id: "pay-001",
    tenant_name: "John Tenant",
    amount: 2500,
    currency: "GHS",
    method: "card",
    status: "completed",
    date: "2025-11-01T10:00:00Z",
    invoice_id: "inv-001",
  },
  {
    id: "pay-002",
    tenant_name: "Alice Cooper",
    amount: 3200,
    currency: "GHS",
    method: "mobile_money",
    status: "pending",
    date: "2025-11-05T15:30:00Z",
    invoice_id: "inv-002",
  },
]

export const MOCK_PACKAGES = [
  {
    id: "pkg-001",
    recipient: "John Tenant",
    unit: "A101",
    tracking_number: "TRK123456789",
    carrier: "DHL",
    status: "ready_for_pickup",
    checked_in_at: "2025-11-12T10:30:00Z",
    checked_in_by: "Jane Concierge",
  },
  {
    id: "pkg-002",
    recipient: "Alice Cooper",
    unit: "A102",
    tracking_number: "TRK987654321",
    carrier: "UPS",
    status: "picked_up",
    checked_in_at: "2025-11-10T14:20:00Z",
    picked_up_at: "2025-11-11T09:00:00Z",
  },
]

export const MOCK_SMART_DEVICES = [
  {
    id: "dev-001",
    unit_id: "unit-001",
    type: "Smart Lock",
    vendor: "Yale",
    status: "online",
    last_activity: "2025-11-12T08:45:00Z",
  },
  {
    id: "dev-002",
    unit_id: "unit-001",
    type: "Smart Thermostat",
    vendor: "Nest",
    status: "online",
    last_activity: "2025-11-12T09:00:00Z",
    current_temp: 22,
    target_temp: 23,
  },
  {
    id: "dev-003",
    unit_id: "unit-002",
    type: "Energy Monitor",
    vendor: "Sense",
    status: "online",
    last_activity: "2025-11-12T09:15:00Z",
    current_usage: 2.4,
  },
]

export const MOCK_SUBSCRIPTIONS = [
  {
    id: "sub-001",
    name: "Premium Fiber 100Mbps",
    provider: "Ghana Telecom",
    category: "internet",
    price: 250,
    currency: "GHS",
    features: ["100Mbps Speed", "Unlimited Data", "Free Router"],
  },
  {
    id: "sub-002",
    name: "Premium Cable TV",
    provider: "MultiChoice",
    category: "cable",
    price: 180,
    currency: "GHS",
    features: ["150+ Channels", "HD Quality", "DVR Service"],
  },
]

export const MOCK_WASTE_SCHEDULE = [
  {
    id: "waste-001",
    building_id: "bld-001",
    type: "General Waste",
    day: "Monday",
    time: "07:00",
    vendor: "Zoomlion",
  },
  {
    id: "waste-002",
    building_id: "bld-001",
    type: "Recycling",
    day: "Wednesday",
    time: "07:00",
    vendor: "Zoomlion",
  },
]
