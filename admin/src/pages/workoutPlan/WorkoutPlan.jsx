import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';

import ShadowCard from '../../components/common/ShadowCard';
import MinHeader from '../../components/common/MinHeader';
import BtnOutline from '../../components/buttons/BtnOutline';
import Btn from '../../components/buttons/Btn';

import TextInput from '../../components/inputs/TextInput';
import TextAreaInput from '../../components/inputs/TextAreaInput';
import SelectInput from '../../components/inputs/SelectInput';
import { fetchAllExercises } from '../../services/exercise/exerciseAction';


const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  slug: Yup.string().required('Slug is required'),
  goal: Yup.string().required('Goal is required'),
  level: Yup.string().required('Level is required'),
  description: Yup.string().required('Description is required'),
  daysPerWeek: Yup.number().required('Days per week is required').min(1).max(7),
  workoutDays: Yup.array().of(
    Yup.object({
      day: Yup.string().required('Day is required'),
      focus: Yup.string().required('Focus is required'),
      exercises: Yup.array().of(
        Yup.object({
          exerciseId: Yup.string().required('Exercise is required'),
          sets: Yup.number().required('Sets is required').min(1),
          reps: Yup.string().required('Reps is required'),
          rest: Yup.string().optional(),
        })
      ).min(1, 'At least one exercise is required'),
    })
  ).min(1, 'Add at least one workout day'),
});

const WorkoutPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { exercises } = useSelector((state) => state.exercise); // assuming you have this
  const exerciseOptions = exercises.map((ex) => ({
    label: ex.name,
    value: ex._id,
  }));

  useEffect(() => {
    dispatch(fetchAllExercises()); // for dropdown list
  }, []);

  const initialValues = {
    name: '',
    slug: '',
    goal: 'Muscle Gain',
    level: '',
    description: '',
    daysPerWeek: 3,
    workoutDays: [],
    isFeatured: false,
    isActive: true,
  };

  const handleSubmit = async (values) => {
    const slug = values.slug || values.name.toLowerCase().replace(/\s+/g, '-');
    const input = {
      ...values,
      slug,
    };

    try {
      // await dispatch(createWorkoutPlan(input));
      navigate('/workout-plans');
    } catch (error) {
      console.error('Error creating workout plan:', error);
    }
  };

  return (
    <div>
      <MinHeader title="Create Workout Plan" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
          <Form className="space-y-6 p-4">
            <ShadowCard className="space-y-6">
              <TextInput
                title="Name"
                name="name"
                placeholder="Workout Plan Name"
                value={values.name}
                onChange={handleChange}
                error={touched.name && errors.name}
              />
              <TextInput
                title="Slug"
                name="slug"
                placeholder="workout-plan-slug"
                value={values.slug}
                onChange={handleChange}
                error={touched.slug && errors.slug}
              />
              <SelectInput
                title="Goal"
                name="goal"
                value={values.goal}
                onChange={(val) => setFieldValue('goal', val)}
                options={[
                  { label: 'Muscle Gain', value: 'Muscle Gain' },
                  { label: 'Fat Loss', value: 'Fat Loss' },
                  { label: 'Strength', value: 'Strength' },
                  { label: 'Endurance', value: 'Endurance' },
                  { label: 'General Fitness', value: 'General Fitness' },
                ]}
              />
              <SelectInput
                title="Level"
                name="level"
                value={values.level}
                onChange={(val) => setFieldValue('level', val)}
                options={[
                  { label: 'Beginner', value: 'Beginner' },
                  { label: 'Intermediate', value: 'Intermediate' },
                  { label: 'Advanced', value: 'Advanced' },
                ]}
                error={touched.level && errors.level}
              />
              <TextAreaInput
                title="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                error={touched.description && errors.description}
              />
              <TextInput
                title="Days Per Week"
                name="daysPerWeek"
                type="number"
                value={values.daysPerWeek}
                onChange={handleChange}
                error={touched.daysPerWeek && errors.daysPerWeek}
              />

              <FieldArray
                name="workoutDays"
                render={(arrayHelpers) => (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Workout Days</h3>
                      <BtnOutline type="button" onClick={() => arrayHelpers.push({
                        day: '',
                        focus: '',
                        exercises: [],
                      })}>Add Day</BtnOutline>
                    </div>
                    {values.workoutDays.map((day, dayIndex) => (
                      <ShadowCard key={dayIndex} className="space-y-4 border-l-4 border-blue-400 p-4">
                        <TextInput
                          title="Day"
                          name={`workoutDays.${dayIndex}.day`}
                          value={day.day}
                          onChange={handleChange}
                          error={touched.workoutDays?.[dayIndex]?.day && errors.workoutDays?.[dayIndex]?.day}
                        />
                        <TextInput
                          title="Focus"
                          name={`workoutDays.${dayIndex}.focus`}
                          value={day.focus}
                          onChange={handleChange}
                          error={touched.workoutDays?.[dayIndex]?.focus && errors.workoutDays?.[dayIndex]?.focus}
                        />

                        <FieldArray
                          name={`workoutDays.${dayIndex}.exercises`}
                          render={(exerciseHelpers) => (
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <p className="font-medium">Exercises</p>
                                <BtnOutline type="button" onClick={() => exerciseHelpers.push({
                                  exerciseId: '',
                                  sets: 3,
                                  reps: '10-12',
                                  rest: '60s',
                                })}>Add Exercise</BtnOutline>
                              </div>
                              {day.exercises.map((exercise, exIndex) => (
                                <div key={exIndex} className="grid grid-cols-4 gap-2">
                                  <SelectInput
                                    name={`workoutDays.${dayIndex}.exercises.${exIndex}.exerciseId`}
                                    value={exercise.exerciseId}
                                    onChange={(val) => setFieldValue(`workoutDays.${dayIndex}.exercises.${exIndex}.exerciseId`, val)}
                                    options={exerciseOptions}
                                  />
                                  <TextInput
                                    name={`workoutDays.${dayIndex}.exercises.${exIndex}.sets`}
                                    value={exercise.sets}
                                    onChange={handleChange}
                                    placeholder="Sets"
                                  />
                                  <TextInput
                                    name={`workoutDays.${dayIndex}.exercises.${exIndex}.reps`}
                                    value={exercise.reps}
                                    onChange={handleChange}
                                    placeholder="Reps"
                                  />
                                  <TextInput
                                    name={`workoutDays.${dayIndex}.exercises.${exIndex}.rest`}
                                    value={exercise.rest}
                                    onChange={handleChange}
                                    placeholder="Rest"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        />

                        <BtnOutline type="button" onClick={() => arrayHelpers.remove(dayIndex)}>
                          Remove Day
                        </BtnOutline>
                      </ShadowCard>
                    ))}
                  </div>
                )}
              />

              <div className="space-y-3 pt-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={values.isFeatured}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span>Featured Plan</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={values.isActive}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span>Active</span>
                </label>
              </div>

              <div className="flex justify-end space-x-4">
                <BtnOutline type="button" onClick={() => navigate('/workout-plans')}>
                  Cancel
                </BtnOutline>
                <Btn type="submit">Create Workout Plan</Btn>
              </div>
            </ShadowCard>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default WorkoutPlan;
