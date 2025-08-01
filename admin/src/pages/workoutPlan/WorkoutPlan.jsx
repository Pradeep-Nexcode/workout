import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';

import TextInput from '../../components/inputs/TextInput';
import SelectInput from '../../components/inputs/SelectInput';
import Btn from '../../components/buttons/Btn';
import ShadowCard from '../../components/common/ShadowCard';
import BtnOutline from '../../components/buttons/BtnOutline';

import { fetchAllExercises } from '../../services/exercise/exerciseAction';
import { createWorkoutPlan } from '../../services/workoutplans/workoutplansAction';
// import { createUserWorkoutPlan } from '../../services/userworkoutplans/userWorkoutPlansAction';

// ✅ Validation Schema - Updated to match model
const validationSchema = Yup.object().shape({
  targetMuscles: Yup.array().of(Yup.string()),
  exercises: Yup.array().of(
    Yup.object().shape({
      exerciseId: Yup.string().required('Exercise is required'),
      sets: Yup.number().required('Sets are required').min(1),
      reps: Yup.string().required('Reps are required'),
      rest: Yup.string(),
      completed: Yup.boolean(),
    })
  ).min(1, 'Add at least one exercise'),
});

// ✅ Initial Values - Updated to match model
const initialValues = {
  user: '', // This should be populated with current user ID
  date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
  targetMuscles: [],
  exercises: [
    {
      exerciseId: '',
      sets: 3,
      reps: '10-12',
      rest: '60s',
      completed: false
    }
  ],
  status: 'Pending',
};

const CreateUserWorkoutPlanForm = () => {
  const dispatch = useDispatch();

  const { exercises } = useSelector((state) => state.exercise);
  const { user } = useSelector((state) => state.auth); // Assuming you have current user in auth state

  const exerciseOptions = exercises.map((ex) => ({
    label: ex.name,
    value: ex._id,
  }));

  const muscleOptions = [
    { label: 'Chest', value: 'Chest' },
    { label: 'Back', value: 'Back' },
    { label: 'Legs', value: 'Legs' },
    { label: 'Shoulders', value: 'Shoulders' },
    { label: 'Biceps', value: 'Biceps' },
    { label: 'Triceps', value: 'Triceps' },
    { label: 'Core', value: 'Core' }
  ];



  useEffect(() => {
    dispatch(fetchAllExercises());
  }, [dispatch]);

  const handleSubmit = (values, { setSubmitting }) => {
    // Set user ID if not already set
    const workoutPlanData = {
      ...values,
      user: values.user || user?._id, // Use current user if not specified
    };

    console.log('Creating User Workout Plan:', workoutPlanData);

    dispatch(createWorkoutPlan(workoutPlanData));
    setSubmitting(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create User Workout Plan</h1>
      <Formik
        initialValues={{
          ...initialValues,
          user: user?._id || '', // Auto-populate with current user
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, touched, errors, setFieldValue }) => (
          <Form className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">

              {/* Left: Plan Details */}
              <ShadowCard className="flex-1 p-4 space-y-4">

                {/* Target Muscles */}
                <SelectInput
                  title="Target Muscles"
                  name="targetMuscles"
                  value={values.targetMuscles}
                  onChange={(val) => setFieldValue('targetMuscles', val)}
                  options={muscleOptions}
                  isMulti
                  error={touched.targetMuscles && errors.targetMuscles}
                />


                <Btn type="submit" className="mt-4 w-full">Create User Workout Plan</Btn>
              </ShadowCard>

              {/* Right: Exercises */}
              <ShadowCard className="flex-1 p-4 space-y-4">
                <h3 className="text-lg font-semibold">Exercises</h3>

                <FieldArray name="exercises">
                  {({ push, remove }) => (
                    <div>
                      {values.exercises.map((exercise, index) => (
                        <ShadowCard key={index} className="p-3 mb-4">

                          {/* Exercise Selection */}
                          <SelectInput
                            title="Exercise"
                            name={`exercises[${index}].exerciseId`}
                            value={exercise.exerciseId}
                            onChange={(val) => setFieldValue(`exercises[${index}].exerciseId`, val)}
                            options={exerciseOptions}
                            error={touched.exercises?.[index]?.exerciseId && errors.exercises?.[index]?.exerciseId}
                          />

                          {/* Sets */}
                          <TextInput
                            title="Sets"
                            name={`exercises[${index}].sets`}
                            type="number"
                            value={exercise.sets}
                            onChange={handleChange}
                            error={touched.exercises?.[index]?.sets && errors.exercises?.[index]?.sets}
                          />

                          {/* Reps */}
                          <TextInput
                            title="Reps"
                            name={`exercises[${index}].reps`}
                            value={exercise.reps}
                            onChange={handleChange}
                            error={touched.exercises?.[index]?.reps && errors.exercises?.[index]?.reps}
                          />

                          {/* Rest */}
                          <TextInput
                            title="Rest"
                            name={`exercises[${index}].rest`}
                            value={exercise.rest}
                            onChange={handleChange}
                            placeholder="e.g., 60s, 2min"
                            error={touched.exercises?.[index]?.rest && errors.exercises?.[index]?.rest}
                          />

                          {/* Completed Checkbox */}
                          <div className="flex items-center mt-2">
                            <input
                              type="checkbox"
                              name={`exercises[${index}].completed`}
                              checked={exercise.completed}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            <label>Completed</label>
                          </div>

                          {/* Remove Exercise Button */}
                          <BtnOutline
                            type="button"
                            onClick={() => remove(index)}
                            className="mt-2 w-full text-red-500"
                          >
                            Remove Exercise
                          </BtnOutline>
                        </ShadowCard>
                      ))}

                      {/* Add Exercise Button */}
                      <BtnOutline
                        type="button"
                        onClick={() => push({
                          exerciseId: '',
                          sets: 3,
                          reps: '10-12',
                          rest: '60s',
                          completed: false
                        })}
                        className="w-full"
                      >
                        + Add Exercise
                      </BtnOutline>
                    </div>
                  )}
                </FieldArray>
              </ShadowCard>

            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateUserWorkoutPlanForm;