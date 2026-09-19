# API Documentation

## Base URL

- Local: http://localhost:8000

## Endpoints

### GET /health
Returns service health status.

### POST /api/analyze
Analyze a waste stream and return the recommended valorization pathway.

Request body:

```json
{
  "industry": "Foundry",
  "waste_type": "Foundry Sand",
  "quantity": 2.5,
  "composition": {
    "silica": 82,
    "moisture": 4,
    "other": 14
  },
  "contamination": "Low",
  "generation_frequency": "Weekly",
  "location": "Coimbatore"
}
```

Response includes:

- recommended_pathway
- valorization_score
- pathways
- market_match
- economic
- environmental
- reasons
- limitations
- factor_breakdown

### GET /api/market
Returns prototype market users.

### GET /api/forecast
Returns forecasted monthly generation and projected value.

### POST /api/what-if
Trials a scenario by changing contamination, demand, transport distance, quantity, processing cost, and transport cost.
