import { Link } from 'react-router';

export const About = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About</h1>
      <p className="=mb-2 text-lg">
        Created by <span className="font-semibold">Yulia Demir</span>. Родилась
        в семье плотника и доярки. Люблю шпаклевать и шпалоукладывание. Да и
        вообще мне нравится сочетание букв шпа. Коплю на ламборджини, но боюсь
        опять сорвусь и куплю сникерс и жвачку.
      </p>
      <p className="mb-4 text-lg">
        This app was developed as part of the{' '}
        <Link
          to="https://rs.school/courses/reactjs"
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          RS School React course
        </Link>
        .
      </p>
      <Link
        to="/"
        className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600"
      >
        Back to Home
      </Link>
    </div>
  );
};
