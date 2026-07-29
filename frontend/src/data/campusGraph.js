const campusGraph = {
  "GATE 1": {
    "GATE 2": 1,
    "AI BLOCK": 2,
  },

  "GATE 2": {
    "GATE 1": 1,
    "AI BLOCK": 1,
    "D BLOCK": 1,
  },

  "AI BLOCK": {
    "GATE 1": 2,
    "GATE 2": 1,
    "A BLOCK": 1,
    "D BLOCK": 1,
    "CAFETERIA": 1,
  },

  "A BLOCK": {
    "AI BLOCK": 1,
    "CAFETERIA": 1,
    "B BLOCK": 2,
  },

  "B BLOCK": {
    "A BLOCK": 2,
    "CAFETERIA": 1,
    "SCHOOL OF HOSPITALITY": 1,
    "C BLOCK": 1,
  },

  "C BLOCK": {
    "B BLOCK": 1,
    "SCHOOL OF HOSPITALITY": 1,
    "BOYS HOSTEL": 2,
  },

  "D BLOCK": {
    "GATE 2": 1,
    "AI BLOCK": 1,
  },

  "CAFETERIA": {
    "AI BLOCK": 1,
    "A BLOCK": 1,
    "B BLOCK": 1,
  },

  "SCHOOL OF HOSPITALITY": {
    "B BLOCK": 1,
    "C BLOCK": 1,
  },

  "BOYS HOSTEL": {
    "C BLOCK": 2,
    "PARKING": 3,
  },

  "PARKING": {
    "BOYS HOSTEL": 3,
    "GATE 4": 1,
  },

  "GATE 4": {
    "PARKING": 1,
  },
};

export default campusGraph;