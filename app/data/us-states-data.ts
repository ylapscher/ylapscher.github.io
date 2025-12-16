/**
 * Record type mapping state names to boolean values.
 * Used to track visited or lived states.
 * @typedef {Record<string, boolean>} StateRecord
 */
type StateRecord = Record<string, boolean>;

/**
 * Record of all US states and territories with visited status.
 * @type {StateRecord}
 */
export const visitedStates: StateRecord = {
  "Alabama": true,
  "Alaska": false,
  "Arizona": true,
  "Arkansas": false,
  "California": true,
  "Colorado": true,
  "Connecticut": true,
  "Delaware": false,
  "District of Columbia": false,
  "Florida": true,
  "Georgia": true,
  "Hawaii": false,
  "Idaho": false,
  "Illinois": true,
  "Indiana": true,
  "Iowa": false,
  "Kansas": false,
  "Kentucky": true,
  "Louisiana": true,
  "Maine": true,
  "Maryland": true,
  "Massachusetts": true,
  "Michigan": true,
  "Minnesota": true,
  "Mississippi": false,
  "Missouri": false,
  "Montana": false,
  "Nebraska": false,
  "Nevada": true,
  "New Hampshire": true,
  "New Jersey": true,
  "New Mexico": false,
  "New York": true,
  "North Carolina": true,
  "North Dakota": false,
  "Ohio": true,
  "Oklahoma": false,
  "Oregon": true,
  "Pennsylvania": true,
  "Rhode Island": false,
  "South Carolina": true,
  "South Dakota": false,
  "Tennessee": true,
  "Texas": true,
  "Utah": true,
  "Vermont": true,
  "Virginia": true,
  "Washington": true,
  "West Virginia": true,
  "Wisconsin": true,
  "Wyoming": false,
  "Puerto Rico": false
};

/**
 * Record of US states where the person has lived.
 * @type {StateRecord}
 */
export const livedStates: StateRecord = {
  "Florida": true,
  "New York": true,
  "New Jersey": true,
  "Maine": true,
  "Georgia": true,
  "Louisiana": true,
  "Ohio": true
}; 