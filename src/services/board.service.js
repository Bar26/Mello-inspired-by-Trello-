import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'Borad'
export const carService = {
	query,
}

function query() {
	return storageService.query(STORAGE_KEY)
}

storageService
	.post(STORAGE_KEY, {
		_id: 'b101',
		title: 'Trello',
		archivedAt: 1589983468418,
		createdAt: 1589983468418,
		createdBy: {
			_id: 'u101',
			fullname: 'Itamar Sahar',
			imgUrl: 'http://some-img',
		},
		style: {},
		labels: [
			{
				id: 'l101',
				title: 'Done',
				color: '#61bd4f',
			},
			{
				id: 'l102',
				title: 'Progress',
				color: '#61bd33',
			},
		],
		members: [
			{
				_id: 'u101',
				fullname: 'Noam Bar',
				imgUrl: 'https://www.google.com',
			},
		],
		groups: [
			{
				id: 'g101',
				title: 'To Do',
				archivedAt: 1589983468418,
				tasks: [
					{
						id: 'c101',
						title: 'Replace logo',
					},
					{
						id: 'c102',
						title: 'Add Samples',
					},
				],
				style: {},
			},
			{
				id: 'g102',
				title: ' Progress',
				tasks: [
					{
						id: 'c103',
						title: 'Login Auth',
						archivedAt: 1589983468418,
					},
					{
						id: 'c104',
						title: 'Add Socket',
						status: 'in-progress',
						description: 'description',
						comments: [
							{
								id: 'ZdPnm',
								txt: 'also @yaronb please CR this',
								createdAt: 1590999817436.0,
								byMember: {
									_id: 'u101',
									fullname: 'Tal Tarablus',
									imgUrl:
										'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
								},
							},
						],
						checklists: [
							{
								id: 'YEhmF',
								title: 'Checklist',
								todos: [
									{
										id: '212jX',
										title: 'To Do 1',
										isDone: false,
									},
								],
							},
						],
						memberIds: ['u101'],
						labelIds: ['l101', 'l102'],
						createdAt: 1590999730348,
						dueDate: 16156215211,
						byMember: {
							_id: 'u101',
							username: 'Tal',
							fullname: 'Tal Tarablus',
							imgUrl:
								'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
						},
						style: {
							bgColor: '#26de81',
						},
					},
				],
				style: {},
			},
			{
				id: 'g103',
				title: 'QA',
				archivedAt: 1589983468418,
				tasks: [
					{
						id: 'c105',
						title: 'Remove Task',
					},
					{
						id: 'c106',
						title: 'Add Task',
					},
				],
				style: {},
			},
			{
				id: 'g104',
				title: 'BUGS',
				archivedAt: 1589983468418,
				tasks: [
					{
						id: 'c107',
						title: 'Handle Refresh',
					},
					{
						id: 'c108',
						title: 'Broken Image',
					},
				],
				style: {},
			},
			{
				id: 'g105',
				title: 'Done',
				archivedAt: 1589983468418,
				tasks: [
					{
						id: 'c109',
						title: 'Sign Up',
					},
					{
						id: 'c110',
						title: 'Home Page Design',
					},
				],
				style: {},
			},
		],
		activities: [
			{
				id: 'a101',
				title: 'Changed Color',
				createdAt: 154514,
				byMember: {
					_id: 'u101',
					fullname: 'Itamar Sahar',
					imgUrl: 'http://some-img',
				},
				task: {
					id: 'c101',
					title: 'Replace Logo',
				},
			},
		],
	})
	.then((x) => console.log(x))