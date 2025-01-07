import { TestBed } from '@angular/core/testing';
import { effect, EnvironmentInjector, signal } from '@angular/core';

it('should destroy an effect', () => {
  let effectCounter = 0;
  const counter = signal(1);
  const effectRef = TestBed.runInInjectionContext(() =>
    effect(
      () => {
        counter();
        effectCounter++;
      },
      { injector: TestBed.inject(EnvironmentInjector) }
    )
  );
  expect(effectCounter).toBe(0);
  effectRef.destroy();
  TestBed.flushEffects();
  expect(effectCounter).toBe(1);

  counter.set(2);
  TestBed.flushEffects();
  expect(effectCounter).toBe(2);

  counter.set(3);
  TestBed.flushEffects();
  expect(effectCounter).toBe(3);
});