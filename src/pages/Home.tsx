import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

type EditTaskArgs = {
  taskId: number,
  newTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find((task) => task.title === newTask.title);

    if(taskWithSameTitle){
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
    }
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const doneTasks = tasks.map((task) => ({ ... task }));

    const findTask = doneTasks.find((task) => task.id === id);

    if(!findTask)
      return;

    findTask.done = !findTask.done;

    setTasks(doneTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('', '', [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const removeTask = tasks.filter((task) => task.id !== id);

          setTasks(removeTask);
        }
      }
    ])

  }
  
  function handleEditTask({ taskId, newTitle }: EditTaskArgs){
    const updateTasks = tasks.map((task) => ({ ... task }));

    const existsTask = updateTasks.find((task) => task.id === taskId);

    if(!existsTask)
      return;

    existsTask.title = newTitle;

    setTasks(updateTasks);

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        // editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})