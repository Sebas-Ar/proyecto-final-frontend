const tareas = [
    {
        "_id": "1",
        "titulo": "caminar",
        "descripcion": "salir a caminar en las mañanas",
        "estado": "activa",
        "responsable": "sebas"
    },
    {
        "_id": "2",
        "titulo": "correr",
        "descripcion": "salir a caminar en las mañanas",
        "estado": "activa",
        "responsable": "sebas"
    },
    {
        "_id": "3",
        "titulo": "mascota",
        "descripcion": "salir a caminar en las mañanas",
        "estado": "activa",
        "responsable": "sebas"
    },
    {
        "_id": "4",
        "titulo": "limpiar",
        "descripcion": "salir a caminar en las mañanas",
        "estado": "activa",
        "responsable": "sebas"
    }
]

const crearTarea = async (tarea) => {
    
    tareas.push({
        _id: tareas.length + 1,
        titulo: data.titulo,
        descripcion: data.descripcion,
        estado: 'activa',
        responsable: data.responsable
    })
}


const obtenerTareas = async () => {
    let url = 'http://localhost:3000/tareas'
    const query = '?estado=' + estado

    if (estado != '') {
        url = url + query
    }
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const editarTarea = async (id) => {
    console.log(id)
    const response = await fetch(`http://localhost:3000/tareas/${id}`)
    const data = await response.json()

}

const verTarea = async (id) => {
    // console.log(id)
    // const response = await fetch(`http://localhost:3000/tareas/${id}`)
    // const data = await response.json()

    return {
        "_id": "4",
        "titulo": "caminata en las mañanas",
        "descripcion": "salir a caminar en las mañanas",
        "estado": "activa",
        "responsable": "sebas"
    }
}

const eliminarTarea = async (id) => {
    console.log(id)
    const response = await fetch(`http://localhost:3000/tareas/${id}`, {
        method: 'DELETE'
    })
    const data = await response.json()
}

const listaTareas = document.getElementById('lista-tareas')

const renderTareas = async () => {

    listaTareas.innerHTML = ''

    // obtener tareas del servidor
    // const tareas = await obtenerTareas()

    tareas.forEach((tarea) => {
        const listItem = document.createElement('li')
        const article = document.createElement('article')
        const datos = document.createElement('div')

        const titulo = document.createElement('h4')
        const estado = document.createElement('p')
        const responsable = document.createElement('p')

        datos.classList.add('tarea')
        titulo.innerText = tarea.titulo,
        estado.innerText = `Estado: ${tarea.estado}`,
        responsable.innerText = `Responsable: ${tarea.responsable}`
        
        datos.appendChild(titulo)
        datos.appendChild(estado)
        datos.appendChild(responsable)

        article.appendChild(datos)
        listItem.appendChild(article)

        listaTareas.appendChild(listItem)

        const wrapperBotones = document.createElement('div')
        wrapperBotones.classList.add('wrapper-botones')

        const buttonVerMas = document.createElement('button')
        const buttonEditar = document.createElement('button')
        const buttonEliminar = document.createElement('button')

        buttonVerMas.innerText = 'Ver Más'
        buttonEditar.innerText = 'Editar'
        buttonEliminar.innerText = 'Eliminar'

        wrapperBotones.appendChild(buttonVerMas)
        wrapperBotones.appendChild(buttonEditar)
        wrapperBotones.appendChild(buttonEliminar)

        listItem.appendChild(wrapperBotones)

        buttonVerMas.addEventListener('click', async () => {
            const tareaCompleta = await verTarea(tarea._id)
            const descripcion = document.createElement('p')
            // agregar al lado de titulo
            descripcion.innerText = `descripción: ${tareaCompleta.descripcion}`
            datos.appendChild(descripcion)
            buttonVerMas.disabled = true

        })

        buttonEditar.addEventListener('click', async () => {
            const editarTarea = document.getElementById('wrapper-form-editar')
            editarTarea.style.display = 'grid'

            const tareaCompleta = await verTarea(tarea._id)

            const editarTitulo = document.getElementById('editar-titulo')
            const editarDescripcion = document.getElementById('editar-descripcion')
            const editarResponsable = document.getElementById('editar-responsable')
            const editarEstado = document.getElementById('editar-estado')

            editarTitulo.value = tareaCompleta.titulo
            editarDescripcion.value = tareaCompleta.descripcion
            editarResponsable.value = tareaCompleta.responsable
            editarEstado.value = tareaCompleta.estado

            const formEditarTarea = document.getElementById('form-editar-tarea')
            formEditarTarea.addEventListener('submit', async (e) => {
                e.preventDefault()
                const data = Object.fromEntries(new FormData(e.target))
                console.log(data)

                if (data.titulo != '' && data.descripcion != '' && data.responsable != '' && data.estado != '') {

                    editarTarea(tarea._id, data)

                    renderTareas()
                }
            })
        })

        buttonEliminar.addEventListener('click', () => {
            eliminarTarea(tarea._id)
            renderTareas()
        })

    })
}

const buttonAbrirFormCrear = document.getElementById('abrir-form-crear')
const buttonCerrarFormCrear = document.getElementById('cerrar-form-crear')
const buttonCerrarFormEditar = document.getElementById('cerrar-form-editar')

const wrapperFormCrear = document.getElementById('wrapper-form-crear')

buttonCerrarFormCrear.addEventListener('click', () => {
    wrapperFormCrear.style.display = 'none'
})

buttonAbrirFormCrear.addEventListener('click', () => {
    wrapperFormCrear.style.display = 'grid'
})

buttonCerrarFormEditar.addEventListener('click', () => {
    const editarTarea = document.getElementById('wrapper-form-editar')
    editarTarea.style.display = 'none'
})

const formCrearTarea = document.getElementById('form-crear-tarea')

formCrearTarea.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    console.log(data)

    if (data.titulo != '' && data.descripcion != '' && data.responsable != '') {

        // enviar data al servidor

        await crearTarea(data)

        renderTareas()
    }
})

let estado = ''

const selectEstado = document.getElementById('select-estado')
selectEstado.addEventListener('change', (e) => {
    estado = e.target.value
    console.log(estado)
    renderTareas()
})

window.addEventListener('load', renderTareas)