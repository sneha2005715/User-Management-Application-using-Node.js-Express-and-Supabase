const supabase = require('../config/supabaseClient');

exports.createUser = async (data) => {
  return await supabase.from('users').insert([data]).select().single();
};

exports.getAllUsers = async () => {
  return await supabase.from('users').select('*');
};

exports.getUserById = async (id) => {
  return await supabase.from('users').select('*').eq('id', id).single();
};

exports.updateUser = async (id, data) => {
  return await supabase.from('users').update(data).eq('id', id).select().single();
};

exports.deleteUser = async (id) => {
  return await supabase.from('users').delete().eq('id', id);
};

exports.findUserByEmail = async (email) => {
  return await supabase.from('users').select('*').eq('email', email).single();
};
