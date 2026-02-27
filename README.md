# React + TypeScript + Vite Roadpass Frontend

A React frontend application for browsing trips/destinations, connected to the Roadpass API. Users can view, search, filter, and explore trips with smooth interactions and responsive design. Uses [roadpass app](https://github.com/tedyAA/roadpass_api) but can work on its own with data.json

## Overview

This frontend consumes the Rails API and allows users to:

* Browse a paginated list of trips

* Search trips by name with debounced input

* Filter trips by minimum rating

* Sort trips by rating (ascending/descending)

* Click on a trip to view more details in a modal

* Experience a responsive, mobile-friendly interface

* See loading and error states with graceful fallback

## Tech Stack

* React

* TypeScript

* React Router for navigation

* Axios for API requests

## Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/tedyAA/roadpass_api_frontend
```
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```
## Features

* Responsive Grid Layout: Cards adjust from desktop to mobile seamlessly

* Debounced Search: Avoids unnecessary API calls while typing

* Filters & Sorting: Filter by rating, sort ascending/descending

* Trip Modals: Click cards to see full details

* Loading & Error States: Skeleton loaders and fallback UI when API fails

* Pagination: Navigate through trips easily

## Design Decisions

* React Functional Components & Hooks: Clean, maintainable code

* Separate Filters & Pagination Components: Modular, reusable, easy to extend

* Skeleton Loading UI: Smooth user experience during API fetches

* API Fallback: Uses backup data when the API is unavailable

* Responsive Floating Cards: Desktop animation, simple stacked layout for mobile
