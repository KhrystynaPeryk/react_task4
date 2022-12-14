import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Registration from './components/Registration/Registration';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Error from './common/Error/Error';
import NotFound from './common/NotFound/NotFound';
import CourseForm from './components/CourseForm/CourseForm';
import CourseInfo from './components/CourseInfo/CourseInfo';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';

function App() {
	return (
		<div className='container'>
			<Header />
			<Routes>
				<Route exact path='/' element={<Navigate replace to='/login' />} />
				<Route
					exact
					path='/courses/add'
					element={
						<PrivateRoute>
							<CourseForm />
						</PrivateRoute>
					}
				/>
				<Route
					path='/courses/update/:courseId'
					element={
						<PrivateRoute>
							<CourseForm />
						</PrivateRoute>
					}
				/>
				<Route path='/courses/:courseId' element={<CourseInfo />} />
				<Route path='/courses' element={<Courses />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
				<Route path='/error' element={<Error />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
