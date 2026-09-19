-- WASTEWISE SQLite schema and prototype/demo seed data
-- IMPORTANT: All inserted values below are PROTOTYPE/DEMO DATA and are not live market data.

PRAGMA foreign_keys = ON;

CREATE TABLE waste_streams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    industry TEXT NOT NULL,
    waste_type TEXT NOT NULL,
    quantity REAL NOT NULL,
    quantity_unit TEXT NOT NULL,
    silica_percent REAL,
    moisture_percent REAL,
    contamination TEXT,
    generation_frequency TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pathways (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    waste_type TEXT NOT NULL,
    pathway TEXT NOT NULL,
    suitability_score REAL NOT NULL,
    description TEXT
);

CREATE TABLE market_demand (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pathway_id INTEGER NOT NULL,
    market_name TEXT NOT NULL,
    demand_level TEXT NOT NULL,
    compatibility_score REAL NOT NULL,
    distance_km REAL,
    quantity_match REAL,
    FOREIGN KEY (pathway_id) REFERENCES pathways(id)
);

CREATE TABLE analysis_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    waste_stream_id INTEGER NOT NULL,
    valorization_score REAL NOT NULL,
    recommended_pathway TEXT NOT NULL,
    material_suitability TEXT,
    market_demand_score REAL,
    economic_potential REAL,
    environmental_benefit REAL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (waste_stream_id) REFERENCES waste_streams(id)
);

-- PROTOTYPE/DEMO DATA ONLY: sample waste streams for the WASTEWISE hackathon demo.
INSERT INTO waste_streams (
    industry,
    waste_type,
    quantity,
    quantity_unit,
    silica_percent,
    moisture_percent,
    contamination,
    generation_frequency,
    created_at
) VALUES
    ('Foundry', 'Foundry Sand', 2.5, 'tonnes/week', 82.0, 4.0, 'Low', 'Weekly', '2026-01-15 09:00:00'),
    ('Steel', 'Steel Slag', 5.1, 'tonnes/week', 38.0, 6.0, 'Medium', 'Weekly', '2026-01-15 09:15:00'),
    ('Cement', 'Fly Ash', 8.2, 'tonnes/week', 52.0, 3.0, 'Low', 'Weekly', '2026-01-15 09:30:00'),
    ('Textile', 'Textile Waste', 1.8, 'tonnes/week', 12.0, 14.0, 'High', 'Weekly', '2026-01-15 09:45:00');

-- PROTOTYPE/DEMO DATA ONLY: sample valorization pathways.
INSERT INTO pathways (waste_type, pathway, suitability_score, description) VALUES
    ('Foundry Sand', 'Construction Application', 91.0, 'Reuse as construction fill and low-strength material in civil works.'),
    ('Foundry Sand', 'Aggregate Recovery', 87.0, 'Recover sand for aggregate replacement in manufactured products.'),
    ('Steel Slag', 'Recycling', 88.0, 'Process steel slag for metal recovery and secondary material loops.'),
    ('Fly Ash', 'Cement Blending', 94.0, 'Blend fly ash into cement formulations to improve material performance.'),
    ('Textile Waste', 'Material Recovery', 82.0, 'Recover fibers and textiles for remanufacturing and recycled content use.');

-- PROTOTYPE/DEMO DATA ONLY: sample market demand for selected pathways.
INSERT INTO market_demand (
    pathway_id,
    market_name,
    demand_level,
    compatibility_score,
    distance_km,
    quantity_match
) VALUES
    (1, 'Metro Construction Materials', 'High', 92.0, 42.0, 1.1),
    (2, 'Regional Aggregate Supplier', 'Medium', 86.0, 58.0, 0.9),
    (3, 'Steel Recycling Hub', 'High', 90.0, 35.0, 1.4),
    (4, 'Cement Blending Plant', 'High', 96.0, 28.0, 1.3),
    (5, 'Textile Upcycling Cluster', 'Medium', 80.0, 64.0, 0.8);

-- PROTOTYPE/DEMO DATA ONLY: one representative analysis result for the demo flow.
INSERT INTO analysis_results (
    waste_stream_id,
    valorization_score,
    recommended_pathway,
    material_suitability,
    market_demand_score,
    economic_potential,
    environmental_benefit,
    created_at
) VALUES
    (1, 91.5, 'Construction Application', 'High', 88.0, 81000.0, 74.0, '2026-01-15 10:00:00');