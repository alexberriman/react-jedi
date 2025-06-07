import { describe, it, expect } from 'vitest';
import { FormValidator } from './form-validation';

const asyncUsernameValidator = async (value: unknown) => {
  // Simulate API call with immediate resolution
  if (value === 'taken') {
    return 'Username is already taken';
  }
  return undefined;
};

describe('FormValidator', () => {
  describe('required validation', () => {
    it('should validate required fields', () => {
      const validator = new FormValidator({
        username: { required: true }
      });

      expect(validator.validateField('username', '')).toEqual({
        isValid: false,
        error: 'username is required'
      });

      expect(validator.validateField('username', 'john')).toEqual({
        isValid: true
      });
    });

    it('should use custom required message', () => {
      const validator = new FormValidator({
        email: { required: 'Email address is required' }
      });

      expect(validator.validateField('email', '')).toEqual({
        isValid: false,
        error: 'Email address is required'
      });
    });
  });

  describe('string validations', () => {
    it('should validate minLength', () => {
      const validator = new FormValidator({
        password: { minLength: 8 }
      });

      expect(validator.validateField('password', 'short')).toEqual({
        isValid: false,
        error: 'password must be at least 8 characters'
      });

      expect(validator.validateField('password', 'longenough')).toEqual({
        isValid: true
      });
    });

    it('should validate maxLength', () => {
      const validator = new FormValidator({
        bio: { maxLength: { value: 100, message: 'Bio is too long' } }
      });

      expect(validator.validateField('bio', 'a'.repeat(101))).toEqual({
        isValid: false,
        error: 'Bio is too long'
      });

      expect(validator.validateField('bio', 'a'.repeat(50))).toEqual({
        isValid: true
      });
    });

    it('should validate pattern', () => {
      const validator = new FormValidator({
        username: { 
          pattern: {
            value: '^[a-zA-Z0-9_]+$',
            message: 'Username can only contain letters, numbers, and underscores'
          }
        }
      });

      expect(validator.validateField('username', 'user@name')).toEqual({
        isValid: false,
        error: 'Username can only contain letters, numbers, and underscores'
      });

      expect(validator.validateField('username', 'user_name123')).toEqual({
        isValid: true
      });
    });

    it('should validate email', () => {
      const validator = new FormValidator({
        email: { email: true }
      });

      expect(validator.validateField('email', 'invalid')).toEqual({
        isValid: false,
        error: 'Please enter a valid email address'
      });

      expect(validator.validateField('email', 'user@example.com')).toEqual({
        isValid: true
      });
    });
  });

  describe('number validations', () => {
    it('should validate min value', () => {
      const validator = new FormValidator({
        age: { min: 18 }
      });

      expect(validator.validateField('age', 15)).toEqual({
        isValid: false,
        error: 'age must be at least 18'
      });

      expect(validator.validateField('age', 25)).toEqual({
        isValid: true
      });
    });

    it('should validate max value', () => {
      const validator = new FormValidator({
        score: { max: { value: 100, message: 'Score cannot exceed 100' } }
      });

      expect(validator.validateField('score', 150)).toEqual({
        isValid: false,
        error: 'Score cannot exceed 100'
      });

      expect(validator.validateField('score', 85)).toEqual({
        isValid: true
      });
    });

    it('should validate string numbers', () => {
      const validator = new FormValidator({
        age: { min: 18, max: 100 }
      });

      expect(validator.validateField('age', '15')).toEqual({
        isValid: false,
        error: 'age must be at least 18'
      });

      expect(validator.validateField('age', '25')).toEqual({
        isValid: true
      });
    });
  });

  describe('validateForm', () => {
    it('should validate all fields', () => {
      const validator = new FormValidator({
        username: { required: true, minLength: 3 },
        email: { required: true, email: true },
        age: { required: true, min: 18 }
      });

      const result = validator.validateForm({
        username: 'ab',
        email: 'invalid',
        age: '15'
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toEqual({
        username: 'username must be at least 3 characters',
        email: 'Please enter a valid email address',
        age: 'age must be at least 18'
      });
    });

    it('should return valid when all fields pass', () => {
      const validator = new FormValidator({
        username: { required: true, minLength: 3 },
        email: { required: true, email: true }
      });

      const result = validator.validateForm({
        username: 'john',
        email: 'john@example.com'
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });
  });

  describe('complex validations', () => {
    it('should handle multiple validation rules', () => {
      const validator = new FormValidator({
        password: {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
          },
          pattern: {
            value: String.raw`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$`,
            message: 'Password must contain uppercase, lowercase, and numbers'
          }
        }
      });

      // Test empty
      expect(validator.validateField('password', '')).toEqual({
        isValid: false,
        error: 'Password is required'
      });

      // Test too short
      expect(validator.validateField('password', 'Short1')).toEqual({
        isValid: false,
        error: 'Password must be at least 8 characters'
      });

      // Test missing uppercase
      expect(validator.validateField('password', 'lowercase123')).toEqual({
        isValid: false,
        error: 'Password must contain uppercase, lowercase, and numbers'
      });

      // Test valid
      expect(validator.validateField('password', 'ValidPass123')).toEqual({
        isValid: true
      });
    });
  });

  describe('async validation', () => {
    it('should support async validators', async () => {
      const validator = new FormValidator({
        username: { required: true }
      });

      const result1 = await validator.validateFieldAsync('username', 'taken', asyncUsernameValidator);
      expect(result1).toEqual({
        isValid: false,
        error: 'Username is already taken'
      });

      const result2 = await validator.validateFieldAsync('username', 'available', asyncUsernameValidator);
      expect(result2).toEqual({
        isValid: true
      });
    }, 1000); // Add explicit timeout
  });
});