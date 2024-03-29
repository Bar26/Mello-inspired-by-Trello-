const board = require('../data/board.json')
const templates = require('../data/templete.json')
const user = require('../data/user.json')

export const storageService = {
	// query,
	// get,
	// post,
	// put,
	// remove,
}

function query(entityType, delay = 200) {
	var entities = JSON.parse(localStorage.getItem(entityType))
	if (!entities) {
		if (entityType === 'Board') {
			entities = board
			_save('Board', entities)
		} else if (entityType === 'Template') {
			entities = templates
			_save('Template', entities)
		} else if (entityType === 'user') {
			entities = user
			_save('user', entities)
		}
	}

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(entities)
		}, delay)
	})
}

function get(entityType, entityId) {
	return query(entityType).then((entities) =>
		entities.find((entity) => {
			if (entity._id === entityId) {
				return entity
			}
		})
	)
}
function post(entityType, newEntity) {
	newEntity._id = _makeId()
	return query(entityType).then((entities) => {
		entities.push(newEntity)
		_save(entityType, entities)
		return newEntity
	})
}

function put(entityType, updatedEntity) {
	return query(entityType).then((entities) => {
		const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
		entities.splice(idx, 1, updatedEntity)
		_save(entityType, entities)
		return updatedEntity
	})
}

function remove(entityType, entityId) {
	return query(entityType).then((entities) => {
		const idx = entities.findIndex((entity) => entity._id === entityId)
		entities.splice(idx, 1)
		_save(entityType, entities)
	})
}

function _save(entityType, entities) {
	localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
	var text = ''
	var possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}

