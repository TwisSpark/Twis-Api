from flask import Flask, render_template, send_from_directory

app = Flask(
    __name__,
    static_folder='static',
    template_folder='templates'
)

# 🌐 Página principal (por ejemplo, la portada o dashboard)
@app.route('/')
def index():
    return render_template('global/index.html')


# 📤 Página para crear o crear JSON
@app.route('/create_json')
def upload_json():
    return render_template('generales/create_json.html')


# 🧩 Rutas para servir archivos estáticos organizados
# CSS, JS, imágenes y JSON están divididos en global y generales

@app.route('/static/css/<path:filename>')
def serve_css(filename):
    return send_from_directory('static/css', filename)

@app.route('/static/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('static/js', filename)

@app.route('/static/imagenes/<path:filename>')
def serve_imagenes(filename):
    return send_from_directory('static/imagenes', filename)

@app.route('/static/json/<path:filename>')
def serve_json(filename):
    return send_from_directory('static/json', filename)


# 📦 Rutas específicas por carpeta (si usas subdivisiones internas)
@app.route('/static/css/global/<path:filename>')
def serve_global_css(filename):
    return send_from_directory('static/css/global', filename)

@app.route('/static/css/generales/<path:filename>')
def serve_generales_css(filename):
    return send_from_directory('static/css/generales', filename)

@app.route('/static/js/global/<path:filename>')
def serve_global_js(filename):
    return send_from_directory('static/js/global', filename)

@app.route('/static/js/generales/<path:filename>')
def serve_generales_js(filename):
    return send_from_directory('static/js/generales', filename)

@app.route('/static/json/global/<path:filename>')
def serve_global_json(filename):
    return send_from_directory('static/json/global', filename)

@app.route('/static/json/generales/<path:filename>')
def serve_generales_json(filename):
    return send_from_directory('static/json/generales', filename)

@app.route('/static/imagenes/global/<path:filename>')
def serve_global_img(filename):
    return send_from_directory('static/imagenes/global', filename)

@app.route('/static/imagenes/generales/<path:filename>')
def serve_generales_img(filename):
    return send_from_directory('static/imagenes/generales', filename)


# 🧠 Página 404 personalizada (opcional)
@app.errorhandler(404)
def not_found(e):
    return "<h2 style='font-family:sans-serif;text-align:center;margin-top:50px'>❌ Página no encontrada en la página </h2>", 404


# 🚀 Inicio del servidor
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)