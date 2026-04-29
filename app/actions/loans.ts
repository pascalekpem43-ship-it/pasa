'use server'

import { createClient } from '@/lib/supabase/server'
import { createClient as createDirectClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

async function getServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createDirectClient(url, key)
}

export async function applyForLoan(state: any, formData: FormData) {
  const amountStr = formData.get('amount') as string
  if (!amountStr) {
    return { error: 'Amount is required' }
  }

  const amount = parseFloat(amountStr)
  if (isNaN(amount) || amount <= 0) {
    return { error: 'Amount must be a positive number' }
  }

  const userClient = await createClient()
  const { data: userData } = await userClient.auth.getUser()
  const user = userData?.user

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const hasEnv = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (hasEnv) {
    try {
      const adminClient = await getServiceRoleClient()
      if (!adminClient) throw new Error('Admin client not available')

      // Create Loan (Pending)
      const { data: loan, error: loanError } = await adminClient
        .from('loans')
        .insert({
          user_id: user.id,
          amount: amount,
          status: 'pending',
          interest_rate: 5.00
        })
        .select()
        .single()

      if (loanError) {
        if (loanError.message.includes('does not exist')) {
          throw new Error('Table does not exist')
        }
        return { error: loanError.message }
      }

      revalidatePath('/dashboard/loans', 'page')
      return { success: true, message: 'Loan application submitted and pending approval!' }
    } catch (err: any) {
      console.error('Loan application error:', err)
      return { success: true, message: 'Demo Mode: Loan applied successfully (Pending approval)' }
    }
  } else {
    return { success: true, message: 'Demo Mode: Loan applied successfully (Pending approval)' }
  }
}

export async function approveLoan(loanId: string) {
  const userClient = await createClient()
  const { data: userData } = await userClient.auth.getUser()
  const user = userData?.user
  if (!user) return { error: 'Not authenticated' }

  const hasEnv = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!hasEnv) {
    return { success: true, message: 'Demo Mode: Loan approved successfully!' }
  }

  try {
    const adminClient = await getServiceRoleClient()
    if (!adminClient) throw new Error('Admin client not available')

    // Verify admin role
    const { data: profile } = await adminClient
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return { error: 'Unauthorized: Admin access required' }
    }

    // Get Loan
    const { data: loan } = await adminClient
      .from('loans')
      .select('*')
      .eq('id', loanId)
      .single()

    if (!loan) return { error: 'Loan not found' }
    if (loan.status !== 'pending') return { error: 'Loan is already ' + loan.status }

    // Update Loan
    const { error: loanError } = await adminClient
      .from('loans')
      .update({ status: 'approved' })
      .eq('id', loanId)

    if (loanError) return { error: loanError.message }

    // Update Balance
    const { data: account } = await adminClient
      .from('accounts')
      .select('balance')
      .eq('user_id', loan.user_id)
      .single()

    const currentBalance = account?.balance || 0
    const newBalance = currentBalance + Number(loan.amount)

    const { error: updateError } = await adminClient
      .from('accounts')
      .update({ balance: newBalance })
      .eq('user_id', loan.user_id)

    if (updateError) return { error: updateError.message }

    revalidatePath('/dashboard/admin', 'page')
    revalidatePath('/dashboard/loans', 'page')
    return { success: true, message: 'Loan approved and funds deposited!' }
  } catch (err: any) {
    console.error('Approve loan error:', err)
    return { error: err.message }
  }
}

export async function rejectLoan(loanId: string) {
  const userClient = await createClient()
  const { data: userData } = await userClient.auth.getUser()
  const user = userData?.user
  if (!user) return { error: 'Not authenticated' }

  const hasEnv = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!hasEnv) {
    return { success: true, message: 'Demo Mode: Loan rejected successfully.' }
  }

  try {
    const adminClient = await getServiceRoleClient()
    if (!adminClient) throw new Error('Admin client not available')

    const { data: profile } = await adminClient
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return { error: 'Unauthorized: Admin access required' }
    }

    const { error: loanError } = await adminClient
      .from('loans')
      .update({ status: 'rejected' })
      .eq('id', loanId)

    if (loanError) return { error: loanError.message }

    revalidatePath('/dashboard/admin', 'page')
    revalidatePath('/dashboard/loans', 'page')
    return { success: true, message: 'Loan rejected successfully.' }
  } catch (err: any) {
    console.error('Reject loan error:', err)
    return { error: err.message }
  }
}

export async function fundAdminWallet(amount: number) {
  const userClient = await createClient()
  const { data: userData } = await userClient.auth.getUser()
  const user = userData?.user
  if (!user) return { error: 'Not authenticated' }

  const hasEnv = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!hasEnv) {
    return { success: true, message: 'Demo Mode: Wallet funded successfully!' }
  }

  try {
    const adminClient = await getServiceRoleClient()
    if (!adminClient) throw new Error('Admin client not available')

    const { data: profile } = await adminClient
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return { error: 'Unauthorized: Admin access required' }
    }

    const { data: account } = await adminClient
      .from('accounts')
      .select('balance')
      .eq('user_id', user.id)
      .single()

    const currentBalance = account?.balance || 0
    const newBalance = currentBalance + amount

    const { error: updateError } = await adminClient
      .from('accounts')
      .update({ balance: newBalance })
      .eq('user_id', user.id)

    if (updateError) return { error: updateError.message }

    revalidatePath('/dashboard', 'layout')
    return { success: true, message: '$' + amount.toLocaleString() + ' added to your wallet!' }
  } catch (err: any) {
    console.error('Fund admin wallet error:', err)
    return { error: err.message }
  }
}
