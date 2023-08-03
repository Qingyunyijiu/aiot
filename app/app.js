// App.js

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://njbhggmtvtokpzrtvkoo.supabase.co' 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qYmhnZ210dnRva3B6cnR2a29vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEwMzM4OTAsImV4cCI6MjAwNjYwOTg5MH0.05P3Bf39piFA3cW3x9ufeoqGMJUCN-gvfCVVrq1w-ac'

const supabase = createClient(supabaseUrl, supabaseKey)

export default function App() {

  const [temperatures, setTemperatures] = useState([])

  useEffect(() => {
    getTemperatures()
    const subscription = supabase
      .from('temperatures')
      .on('INSERT', data => {
        setTemperatures(prev => [...prev, data.new]) 
      })
      .subscribe()

    return () => {
      supabase.removeSubscription(subscription)
    }
  }, [])

  const getTemperatures = async () => {
    const { data } = await supabase
      .from('temperatures') 
      .select()

    setTemperatures(data)
  }
 
  return (
    <div className="app">
      {temperatures.map(temp => 
        <div key={temp.id}>
          Temperature: {temp.temp}
        </div>  
      )}
    </div>
  )
}