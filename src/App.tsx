import { useState } from 'react'
import { DataTable } from './components/DataTable'
import './App.css'

export interface Person {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

const initialData: Person[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'inactive' },
]

function App() {
  const [data, setData] = useState<Person[]>(initialData)

  const addNewRow = (newPerson: Omit<Person, 'id'>) => {
    const newId = Math.max(...data.map(p => p.id), 0) + 1
    setData(prev => [...prev, { ...newPerson, id: newId }])
  }

  const updateRow = (id: number, updatedPerson: Partial<Person>) => {
    setData(prev => prev.map(person => 
      person.id === id ? { ...person, ...updatedPerson } : person
    ))
  }

  const deleteRow = (id: number) => {
    setData(prev => prev.filter(person => person.id !== id))
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1>
        <p className="text-muted-foreground">
          Manage your team members and their information.
        </p>
      </div>
      <DataTable 
        data={data} 
        onAddRow={addNewRow}
        onUpdateRow={updateRow}
        onDeleteRow={deleteRow}
      />
    </div>
  )
}

export default App