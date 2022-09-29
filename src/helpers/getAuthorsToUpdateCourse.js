export const getAllAuthorsForCourseToUpdate = (
	arrOfAllAuthors,
	arrOfCurrentCourseAuthors
) => {
	const allAuthorsIds = arrOfAllAuthors.map((obj) => obj.id);

	const allAuthors = allAuthorsIds.filter(function (obj) {
		return arrOfCurrentCourseAuthors.indexOf(obj) === -1;
	});
	return allAuthors;
};

export const getAuthorNameById = (arrOfIds, arrOfAllAuthors) => {
	const arrOfObj = arrOfIds.map((id) => {
		const authorObj = arrOfAllAuthors.find((obj) => obj.id === id);
		return { id: id, name: authorObj.name };
	});
	return arrOfObj;
};
