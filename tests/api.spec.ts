import { test, expect } from '@playwright/test';

test('GET lista de usuarios', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users?page=2', {
    headers: {
      'x-api-key': 'free_user_3DMjRi1AKoLRdSnAMPqO0VRP5fv'
    }
  });
  
  expect(response.status()).toBe(200);
  
  const body = await response.json();
  expect(body.page).toBe(2);
  expect(body.data).toHaveLength(6);
  expect(body.data[0].email).toBe('michael.lawson@reqres.in');
});

test('GET usuario especifico', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users/2', {
    headers: {
      'x-api-key': 'free_user_3DMjRi1AKoLRdSnAMPqO0VRP5fv'
    }
  });
  
  expect(response.status()).toBe(200);
  
  const body = await response.json();
  expect(body.data.email).toBe('janet.weaver@reqres.in');
});

test('GET usuario que no existe', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users/999', {
    headers: {
      'x-api-key': 'free_user_3DMjRi1AKoLRdSnAMPqO0VRP5fv'
    }
  });
  
  expect(response.status()).toBe(404);
  
});

test('POST crear usuario', async ({ request }) => {
  const response = await request.post('https://reqres.in/api/users', {
    headers: {
      'x-api-key': 'free_user_3DMjRi1AKoLRdSnAMPqO0VRP5fv'
    },
    data: {
      name: 'Gre',
      job: 'QA Automation Engineer'
    }
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.name).toBe('Gre');
  expect(body.job).toBe('QA Automation Engineer');
  expect(body.id).toBeTruthy();
});

test('PUT modificar usuario', async ({ request }) => {
  const response = await request.put('https://reqres.in/api/users/2', {
    headers: {
      'x-api-key': 'free_user_3DMjRi1AKoLRdSnAMPqO0VRP5fv'
    },
    data: {
      name: 'Gretchel',
      job: 'Software Engineer'
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.name).toBe('Gretchel');
  expect(body.job).toBe('Software Engineer');
 ;
});

test('DELETE eliminar usuario', async ({ request }) => {
  const response = await request.delete('https://reqres.in/api/users/3', {
    headers: {
      'x-api-key': 'free_user_3DMjRi1AKoLRdSnAMPqO0VRP5fv'
    },
   
  });

  expect(response.status()).toBe(204);

});