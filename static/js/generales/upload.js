const fieldsContainer = document.getElementById('fieldsContainer');
const addGroupBtn = document.getElementById('addFieldBtn');
const jsonOutput = document.getElementById('jsonOutput');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');

/* 🌈 Animación de entrada tipo TwisSpark */
window.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.querySelector('main') || document.body;

  mainContent.style.opacity = '0';
  mainContent.style.transform = 'scale(0.96)';
  mainContent.style.filter = 'blur(6px) brightness(0.7)';
  mainContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease';

  setTimeout(() => {
    mainContent.style.opacity = '1';
    mainContent.style.transform = 'scale(1)';
    mainContent.style.filter = 'blur(0px) brightness(1)';
  }, 80);
});

/* ✨ Crear grupo */
function createGroup() {
  const group = document.createElement('div');
  group.className = 'group-card p-5 space-y-4';
  group.style.opacity = '0';
  group.style.transform = 'translateY(20px) scale(0.97)';
  group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

  group.innerHTML = `
    <div class="flex items-center justify-between">
      <input type="text" class="group-name bg-transparent border-b border-purple-500 px-2 py-1 text-white placeholder-gray-400 w-3/4" placeholder="Nombre del grupo (ej: Ítem 1)">
      <button class="delete-group text-red-400 hover:text-red-500 text-lg" title="Eliminar grupo">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
    <div class="fields space-y-3"></div>
    <div class="text-right">
      <button class="btn-twis add-field-btn">
        <i class="fa-solid fa-plus"></i> Agregar campo
      </button>
    </div>
  `;

  // Efecto de entrada para grupo
  requestAnimationFrame(() => {
    group.style.opacity = '1';
    group.style.transform = 'translateY(0) scale(1)';
  });

  const fieldsDiv = group.querySelector('.fields');

  // Botón agregar campo
  group.querySelector('.add-field-btn').addEventListener('click', () => {
    const field = createField(fieldsDiv);
    fieldsDiv.appendChild(field);
    updateOutput();
  });

  // Eliminar grupo con animación de salida
  group.querySelector('.delete-group').addEventListener('click', () => {
    group.style.opacity = '0';
    group.style.transform = 'translateY(15px) scale(0.95)';
    setTimeout(() => {
      group.remove();
      updateOutput();
    }, 250);
  });

  fieldsContainer.appendChild(group);

  // Inicia con un campo vacío
  const firstField = createField(fieldsDiv);
  fieldsDiv.appendChild(firstField);

  updateOutput();
}

/* 🧩 Crear un campo (clave → valor) */
function createField(container) {
  const div = document.createElement('div');
  div.className = 'flex flex-col gap-2 bg-black/40 border border-purple-600 p-3 rounded-lg shadow-md transition-all';
  div.style.opacity = '0';
  div.style.transform = 'translateY(10px) scale(0.97)';
  div.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

  div.innerHTML = `
    <input type="text" class="input-key bg-transparent border-b border-purple-500 px-2 py-1 text-white placeholder-gray-400" placeholder="Clave (ej: opción)">
    <input type="text" class="input-value bg-transparent border-b border-purple-500 px-2 py-1 text-white placeholder-gray-400" placeholder="Valor (ej: descripción)">
    <div class="text-right">
      <button class="text-red-400 hover:text-red-500 delete-field" title="Eliminar campo">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;

  // Animación de entrada
  requestAnimationFrame(() => {
    div.style.opacity = '1';
    div.style.transform = 'translateY(0) scale(1)';
  });

  div.querySelector('.delete-field').addEventListener('click', () => {
    div.style.opacity = '0';
    div.style.transform = 'translateY(10px) scale(0.95)';
    setTimeout(() => {
      div.remove();
      updateOutput();
    }, 200);
  });

  div.addEventListener('input', updateOutput);
  return div;
}

/* 🔄 Actualizar JSON */
function updateOutput() {
  const groups = [];

  document.querySelectorAll('.group-card').forEach(group => {
    const groupName = group.querySelector('.group-name').value.trim() || 'Sin nombre';
    const fields = group.querySelectorAll('.fields .flex');

    const obj = {};
    fields.forEach(field => {
      const key = field.querySelector('.input-key').value.trim();
      const val = field.querySelector('.input-value').value.trim();
      if (key) obj[key] = val || "";
    });

    groups.push({ [groupName]: obj });
  });

  jsonOutput.textContent = JSON.stringify(groups, null, 2);
}

/* 📋 Copiar JSON */
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(jsonOutput.textContent || '');
    copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado';
    setTimeout(() => {
      copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar JSON';
    }, 1500);
  } catch {
    alert('No se pudo copiar el JSON');
  }
});

/* 💾 Descargar JSON */
downloadBtn.addEventListener('click', () => {
  const text = jsonOutput.textContent;
  if (!text) return alert('Nada para descargar');

  const filename = prompt('¿Cómo quieres llamar al archivo JSON?', 'data.json');
  if (!filename) return;

  const blob = new Blob([text], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename.endsWith('.json') ? filename : `${filename}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
});

/* ➕ Botón principal para crear grupo */
addGroupBtn.addEventListener('click', () => {
  createGroup();
});

/* Iniciar con un grupo vacío */
createGroup();
updateOutput();