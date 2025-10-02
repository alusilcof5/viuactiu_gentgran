"""
Servidor proxy para evitar problemas CORS con APIs públicas
Ejecutar: python proxy_server.py
El servidor escuchará en http://localhost:5001
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Permite todas las peticiones CORS

# Cache simple para reducir llamadas a las APIs
cache = {}

@app.route('/api/ajuts', methods=['GET'])
def get_ajuts():
    """
    Proxy para la API de ajuts de la Diputació de Barcelona
    Combina dos endpoints: beneficiaris + matèries de gent gran
    """
    try:
        print("📡 Obtenint ajuts des de l'API CIDO...")
        
        base_url = 'https://api.diba.cat/dadesobertes/cido/v1/subvencions'
        
        # Dos endpoints diferents
        urls_params = [
            {
                'filter[idEstat]': '2,3',
                'filter[idTipusSubvencio]': '21,22,23',
                'filter[beneficiaris.id]': '12',
                'sort': '-maxDataPublicacioDocument'
            },
            {
                'filter[idEstat]': '2,3',
                'filter[idTipusSubvencio]': '21,22,23',
                'filter[materies.id]': '370',
                'sort': '-maxDataPublicacioDocument'
            }
        ]
        
        all_data = []
        seen_ids = set()
        
        # Obtener datos de ambos endpoints
        for params in urls_params:
            try:
                response = requests.get(base_url, params=params, timeout=10)
                
                if response.status_code == 200:
                    result = response.json()
                    if 'data' in result:
                        # Filtrar duplicados
                        for ajut in result['data']:
                            if ajut['id'] not in seen_ids:
                                all_data.append(ajut)
                                seen_ids.add(ajut['id'])
                        print(f"  ✓ {len(result['data'])} ajuts obtinguts")
                else:
                    print(f"  ⚠ API retornó código {response.status_code}")
                    
            except requests.exceptions.Timeout:
                print(f"  ⏱ Timeout en una de les peticions")
                continue
            except Exception as e:
                print(f"  ❌ Error: {str(e)}")
                continue
        
        if len(all_data) == 0:
            return jsonify({
                'error': 'No s\'han pogut obtenir dades',
                'message': 'Cap dels endpoints ha retornat dades'
            }), 500
        
        print(f"✅ Total: {len(all_data)} ajuts únics")
        
        return jsonify({
            'data': all_data,
            'meta': {
                'total': len(all_data),
                'sources': ['beneficiaris', 'materies']
            }
        })
            
    except Exception as e:
        print(f"❌ Error inesperat: {str(e)}")
        return jsonify({
            'error': str(e),
            'message': 'Error inesperat al connectar amb l\'API'
        }), 500


@app.route('/api/barcelona-espais', methods=['GET'])
def get_barcelona_espais():
    """
    Proxy para datos de Barcelona (preparado para cuando encuentres el endpoint correcto)
    """
    try:
        # TODO: Reemplazar con la URL correcta del Ajuntament de Barcelona
        # url = 'https://opendata-ajuntament.barcelona.cat/data/api/action/datastore_search?resource_id=XXXXX'
        
        # Por ahora retorna datos de ejemplo
        data = {
            'success': True,
            'result': {
                'records': [
                    {
                        'nom': 'Casal d\'Avis Gràcia',
                        'tipus': 'Casal d\'avis',
                        'adreca': 'C/ Gran de Gràcia, 190',
                        'barri': 'Gràcia',
                        'lat': 41.4036,
                        'lng': 2.1561
                    },
                    {
                        'nom': 'Centre Cívic Cotxeres Sants',
                        'tipus': 'Centre cívic',
                        'adreca': 'C/ Sants, 79',
                        'barri': 'Sants',
                        'lat': 41.3748,
                        'lng': 2.1394
                    },
                    {
                        'nom': 'Casal d\'Avis Poblenou',
                        'tipus': 'Casal d\'avis',
                        'adreca': 'Rambla Poblenou, 42',
                        'barri': 'Poblenou',
                        'lat': 41.4002,
                        'lng': 2.2016
                    },
                    {
                        'nom': 'Ateneu Fabricació Ciutat Meridiana',
                        'tipus': 'Ateneu',
                        'adreca': 'Pl. Provenç',
                        'barri': 'Nou Barris',
                        'lat': 41.4677,
                        'lng': 2.1768
                    }
                ]
            }
        }
        return jsonify(data)
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'message': 'Error al carregar dades de Barcelona'
        }), 500


@app.route('/api/generalitat-dependencia', methods=['GET'])
def get_generalitat_dependencia():
    """
    Proxy para API de la Generalitat (opcional, ya funciona directamente)
    """
    try:
        url = 'https://analisi.transparenciacatalunya.cat/resource/yavr-pn8q.json'
        params = {
            '$limit': request.args.get('limit', 5000)
        }
        
        response = requests.get(url, params=params, timeout=15)
        
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({
                'error': f'API retornó código {response.status_code}'
            }), response.status_code
            
    except Exception as e:
        return jsonify({
            'error': str(e),
            'message': 'Error al carregar dades de la Generalitat'
        }), 500


@app.route('/health', methods=['GET'])
def health():
    """Endpoint para verificar que el servidor está funcionando"""
    return jsonify({
        'status': 'ok',
        'message': 'Proxy server is running',
        'endpoints': {
            'ajuts': 'http://localhost:5001/api/ajuts',
            'barcelona': 'http://localhost:5001/api/barcelona-espais',
            'generalitat': 'http://localhost:5001/api/generalitat-dependencia'
        }
    })


if __name__ == '__main__':
    print("=" * 60)
    print("🚀 Servidor proxy iniciat")
    print("=" * 60)
    print("📍 URL: http://localhost:5001")
    print("📌 Endpoints disponibles:")
    print("   - GET /api/ajuts (combina beneficiaris + matèries)")
    print("   - GET /api/barcelona-espais")
    print("   - GET /api/generalitat-dependencia")
    print("   - GET /health")
    print("=" * 60)
    print("⚠️  Recorda: Aquest servidor ha d'estar executant-se")
    print("    mentre utilitzes l'aplicació web")
    print("=" * 60)
    print("\n🔄 Esperant peticions...\n")
    
    app.run(debug=True, port=5001, host='0.0.0.0')