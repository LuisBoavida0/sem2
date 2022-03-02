import { assertEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts'
import { splitName } from './functionToTest.js'

Deno.test('add a single item', () => { //TESTAR TODAS AS FUNCOES, TESTAR SEM DEPENDENCIAS NENHUMAS
  const word = splitName('Luis Boavida')
  console.log(word)
  const result = {
      first: 'Luis',
      last: 'Boavida'
  }
  assertEquals(word, result, 'the qty is not correct')
})
