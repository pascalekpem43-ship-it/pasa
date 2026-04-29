'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function sendMoney(state: any, formData: FormData) {
  const email = formData.get('email') as string
  const amountStr = formData.get('amount') as string

  if (!email || !amountStr) {
    return { error: 'Email and amount are required' }
  }

  const amount = parseFloat(amountStr)
  if (isNaN(amount) || amount <= 0) {
    return { error: 'Amount must be a positive number' }
  }

  const supabase = await createClient()

  // Call our RPC function transfer_money
  const { data, error } = await supabase.rpc('transfer_money', {
    receiver_email: email,
    amount_to_send: amount,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard', 'layout')
  return { success: true }
}
