const arrOfAllAuthors = [
	{ name: 'author', id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36' },
	{ name: 'author2', id: '1c972c52-3198-4098-b6f7-799b45903199' },
	{ name: 'author3', id: '072fe3fc-e751-4745-9af5-aa9eed0ea9ed' },
	{ name: 'author4', id: '40b21bd5-cbae-4f33-b154-0252b1ae03a9' },
	{ name: 'author5', id: '5e0b0f18-32c9-4933-b142-50459b47f09e' },
	{ name: 'author6', id: '9987de6a-b475-484a-b885-622b8fb88bda' },
];

const arrOfMyAuthors = [
	{ name: 'author3', id: '072fe3fc-e751-4745-9af5-aa9eed0ea9ed' },
	{ name: 'author4', id: '40b21bd5-cbae-4f33-b154-0252b1ae03a9' },
];

const getAllAuthorsForCourseToUpdate = (
	arrOfAllAuthors,
	arrOfCurrentCourseAuthors
) => {
	const allAuthorsIds = arrOfAllAuthors.map((obj) => obj.id);

	const allAuthors = allAuthorsIds.filter(function (obj) {
		return arrOfCurrentCourseAuthors.indexOf(obj) === -1;
	});
	return allAuthors;
};

getAllAuthorsForCourseToUpdate(arrOfAllAuthors, arrOfMyAuthors);

const getAuthorNameById = (arrOfIds, arrOfAllAuthors) => {
	const arrOfObj = arrOfIds.map((id) => {
		const authorObj = arrOfAllAuthors.find((obj) => obj.id === id);
		return { id: id, name: authorObj.name };
	});
	return arrOfObj;
};

// compare 2 arrays and make a new ARRAY with ONLY unique objects
