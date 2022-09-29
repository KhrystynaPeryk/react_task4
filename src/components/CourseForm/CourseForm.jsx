import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveNewCourse } from '../../store/courses/actionCreators';
import { saveNewAuthor } from '../../store/authors/actionCreators';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import { v4 as uuidv4 } from 'uuid';

import { labelText, placeholderText, buttonText } from '../../constants';

import { pipeDuration } from '../../helpers/pipeDuration';
import { formatDate } from '../../helpers/dateGenerator';
import { getAuthorsArr } from '../../helpers/authorById';
import { useEffect } from 'react';

const CreateForm = () => {
	const id = useParams();
	const courseToUpdate = id.courseId;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const stateAuthors = useSelector((state) => state.authors.authors);
	const stateCourses = useSelector((state) => state.courses.courses);

	const courseForUpdate = stateCourses.find(
		(course) => course.id === courseToUpdate
	);

	const [updatedTitle, setUpdatedTitle] = useState(courseForUpdate?.title);
	const [updatedDescription, setUpdatedDescription] = useState(
		courseForUpdate?.description
	);
	const [updatedDuration, setUpdatedDuration] = useState(
		courseForUpdate?.duration
	);
	const [updatedCourseAuthors, setUpdatedCourseAuthors] = useState(
		courseForUpdate?.authors
	);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [authors, setAuthors] = useState([]);
	const [addAuthor, setAddAuthor] = useState('');
	const [duration, setDuration] = useState(0);
	const [courseAuthors, setcourseAuthors] = useState([]);

	useEffect(() => {
		setAuthors(stateAuthors);
	}, []);

	const findNameById = (id) => {
		const author = authors.find((el) => el.id === id);
		console.log(author);
		console.log(authors);
		return author.name;
	};

	const handleCreateAuthor = (addAuthor) => {
		if (addAuthor !== '') {
			const newAuthor = { id: uuidv4(), name: addAuthor };
			dispatch(saveNewAuthor(newAuthor));
			setAuthors((authors) => [...authors, newAuthor]);
		} else {
			alert('Please enter a name of your new author');
		}
	};

	const handleAddAuthor = (id) => {
		setcourseAuthors((courseAuthors) => [
			...courseAuthors,
			{ id, name: findNameById(id) },
		]);
		let filterAuthors = authors.filter((author) => author.id !== id);
		setAuthors(filterAuthors);
	};

	const handleDeleteAuthor = (id) => {
		const author = courseAuthors.find((el) => el.id === id);
		let filtercourseAuthors = courseAuthors.filter(
			(authorId) => authorId.id !== id
		);
		setcourseAuthors(filtercourseAuthors);
		setAuthors([...authors, { id, name: author.name }]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(title, description, duration, courseAuthors);
		if (courseAuthors.length === 0 || !title || !description || !duration) {
			alert('Please fill in all the fields and add course author(s)');
		} else {
			const courseData = {
				id: uuidv4(),
				title,
				description,
				creationDate: formatDate(new Date()),
				duration: +duration,
				authors: getAuthorsArr(courseAuthors),
			};
			dispatch(saveNewCourse(courseData));
			navigate('/courses', {
				state: {
					courseAuthors,
					courseData,
				},
			});
		}
	};

	const handleTitleChange = (e) => {
		if (courseToUpdate) {
			return setUpdatedTitle(e.target.value);
		} else {
			return setTitle(e.target.value);
		}
	};

	const handleDescriptionChange = (e) => {
		if (courseToUpdate) {
			return setUpdatedDescription(e.target.value);
		} else {
			return setDescription(e.target.value);
		}
	};

	const handleDurationChange = (e) => {
		if (courseToUpdate) {
			return setUpdatedDuration(e.target.value);
		} else {
			return setDuration(e.target.value);
		}
	};
	console.log(updatedCourseAuthors);
	return (
		<form
			className='d-flex justify-content-between align-items-center flex-wrap'
			onSubmit={handleSubmit}
		>
			<div className='form-group'>
				<Input
					className='form-control'
					placeholderText={placeholderText.title}
					// onChange={(e) => setTitle(e.target.value)}
					onChange={(e) => handleTitleChange(e)}
					labelText={labelText.title}
					type='text'
					id='title'
					name='title'
					value={courseToUpdate ? updatedTitle : undefined}
				/>
			</div>
			<div className='mt-4 form-group'>
				<Button
					buttonText={
						courseToUpdate ? buttonText.updateCourse : buttonText.createCourse
					}
					type='submit'
				/>
			</div>
			<div className='form-group my-3'>
				<label htmlFor='description'>Description</label>
				<textarea
					className='form-control bg-light'
					id='description'
					name='description'
					rows='3'
					cols='200'
					minLength={2}
					placeholder={placeholderText.textArea}
					// onChange={(e) => setDescription(e.target.value)}
					onChange={(e) => handleDescriptionChange(e)}
					value={courseToUpdate ? updatedDescription : undefined}
				></textarea>
			</div>
			<div className='form-group container row mt-4'>
				<div className='col'>
					<h6 className='text-center mb-4'>Add Author</h6>
					<Input
						placeholderText={placeholderText.addAuthor}
						onChange={(e) => setAddAuthor(e.target.value)}
						labelText={labelText.addAuthor}
						type='text'
						id='addAuthor'
						name='addAuthor'
						minLength={2}
					/>
					<div className='mt-3 d-flex justify-content-center align-items-center mb-5'>
						<Button
							buttonText={buttonText.createAuthor}
							onClick={() => handleCreateAuthor(addAuthor)}
							type='button'
						/>
					</div>
					<h6 className='text-center mb-4'>Duration</h6>
					<Input
						placeholderText={placeholderText.duration}
						// onChange={(e) => setDuration(e.target.value)}
						onChange={(e) => handleDurationChange(e)}
						labelText={labelText.duration}
						type='number'
						id='duration'
						name='duration'
						min={1}
						value={courseToUpdate ? updatedDuration : undefined}
					/>
					<p className='my-4 h3'>
						Duration:{' '}
						{courseToUpdate
							? pipeDuration(updatedDuration)
							: pipeDuration(duration)}{' '}
						hours
					</p>
				</div>
				<div className='col'>
					<h6 className='text-center mb-4'>Authors</h6>
					<div>
						{authors.map((author) => {
							return (
								<div
									key={author.id}
									className='d-flex container my-2 mx-5 justify-content-between align-items-center'
								>
									<p className='mx-5'>{author.name}</p>
									<div className='mx-5'>
										<Button
											buttonText={buttonText.addAuthor}
											onClick={() => handleAddAuthor(author.id)}
											type='button'
										/>
									</div>
								</div>
							);
						})}
						{/* {courseToUpdate ? (
							<div>
								{authors.map((author) => {
									return (
										<div
											key={author.id}
											className='d-flex container my-2 mx-5 justify-content-between align-items-center'
										>
											<p className='mx-5'>{author.name}</p>
											<div className='mx-5'>
												<Button
													buttonText={buttonText.addAuthor}
													onClick={() => handleAddAuthor(author.id)}
													type='button'
												/>
											</div>
										</div>
									);
								})}
							</div>
						) : (
							<div>
								{authors.map((author) => {
									return (
										<div
											key={author.id}
											className='d-flex container my-2 mx-5 justify-content-between align-items-center'
										>
											<p className='mx-5'>{author.name}</p>
											<div className='mx-5'>
												<Button
													buttonText={buttonText.addAuthor}
													onClick={() => handleAddAuthor(author.id)}
													type='button'
												/>
											</div>
										</div>
									);
								})}
							</div>
						)} */}
					</div>
					<h6 className='text-center my-4'>Course authors</h6>
					<div>
						{courseAuthors.length === 0 ? (
							<div className='container text-center'>Author list is empty</div>
						) : (
							<div>
								{courseAuthors.map((courseAuthor) => {
									return (
										<div
											key={courseAuthor.id}
											className='d-flex container my-2 mx-5 justify-content-between align-items-center'
										>
											<p className='mx-5'>{courseAuthor.name}</p>
											<div className='mx-5'>
												<Button
													buttonText={buttonText.deleteAuthor}
													onClick={() => handleDeleteAuthor(courseAuthor.id)}
													type='button'
												/>
											</div>
										</div>
									);
								})}
							</div>
						)}
						{/* {courseToUpdate ? (
							<div>
								{updatedCourseAuthors.map((updatedCourseAuthor, index11) => {
									const authorName = stateAuthors.find((el) => {
										if (el.id === updatedCourseAuthor) {
											return el.name;
										}
										return el;
									});
									// const authorName = findNameById(updatedCourseAuthor);
									return (
										<div
											key={index11}
											className='d-flex container my-2 mx-5 justify-content-between align-items-center'
										>
											<p className='mx-5'>{authorName.name}</p>
											<div className='mx-5'>
												<Button
													buttonText={buttonText.deleteAuthor}
													onClick={() =>
														handleDeleteAuthor(updatedCourseAuthor)
													}
													type='button'
												/>
											</div>
										</div>
									);
								})}
							</div>
						) : (
							<div>
								{courseAuthors.length === 0 ? (
									<div className='container text-center'>
										Author list is empty
									</div>
								) : (
									<div>
										{courseAuthors.map((courseAuthor) => {
											return (
												<div
													key={courseAuthor.id}
													className='d-flex container my-2 mx-5 justify-content-between align-items-center'
												>
													<p className='mx-5'>{courseAuthor.name}</p>
													<div className='mx-5'>
														<Button
															buttonText={buttonText.deleteAuthor}
															onClick={() =>
																handleDeleteAuthor(courseAuthor.id)
															}
															type='button'
														/>
													</div>
												</div>
											);
										})}
									</div>
								)}
							</div>
						)} */}
					</div>
				</div>
			</div>
		</form>
	);
};

export default CreateForm;
