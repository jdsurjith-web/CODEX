# --------------------------------------------------
# WASTEWISE - OLLAMA EXPLANATION SERVICE
# --------------------------------------------------

import requests


OLLAMA_URL = "http://localhost:11434/api/generate"

OLLAMA_MODEL = "llama3.2"


def generate_explanation(
    waste_data,
    decision_result,
    economics_result,
    environmental_result
):
    """
    Generate a human-readable explanation using Ollama.

    Ollama only explains the calculated results.
    It does NOT make the pathway decision.
    """

    pathway = decision_result["pathway"]
    score = decision_result["valorization_score"]
    confidence = decision_result["confidence"]

    prompt = f"""
You are the explanation assistant for WASTEWISE,
an industrial waste valorization decision-support system.

Explain the following already-calculated analysis.

Waste characteristics:
- Composition: {waste_data["composition"]}%
- Moisture: {waste_data["moisture"]}%
- Contamination: {waste_data["contamination"]}%
- Quantity: {waste_data["quantity_tonnes"]} tonnes
- Market demand: {waste_data["market_demand"]}%
- Processing cost: {waste_data["processing_cost"]}
- Transport cost: {waste_data["transport_cost"]}
- Hazard level: {waste_data["hazard_level"]}

System recommendation:
- Pathway: {pathway}
- ML confidence: {confidence}
- Valorization score: {score}/100

Economic result:
{economics_result}

Environmental result:
{environmental_result}

Explain:
1. Why the system selected this pathway.
2. The major factors affecting the recommendation.
3. The economic significance.
4. The environmental significance.

Keep the explanation concise and suitable for an industrial dashboard.

Do NOT invent market prices, environmental measurements,
buyers, regulations, or scientific claims.
Do NOT change the system's recommendation.
"""


    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": False
    }


    try:

        response = requests.post(
            OLLAMA_URL,
            json=payload,
            timeout=60
        )

        response.raise_for_status()

        result = response.json()

        return result.get(
            "response",
            "Explanation unavailable."
        )


    except requests.exceptions.ConnectionError:

        return (
            "Ollama is currently unavailable. "
            "The WASTEWISE analysis was completed "
            "using the core ML and decision engines."
        )


    except requests.exceptions.Timeout:

        return (
            "Ollama took too long to respond. "
            "The core WASTEWISE analysis is still valid."
        )


    except Exception as error:

        return (
            f"Explanation service unavailable: {str(error)}"
        )