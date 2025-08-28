import { WeightFormattingPipe } from './weight-formatting.pipe';

describe('WeightFormattingPipe', () => {
  it('create an instance', () => {
    const pipe = new WeightFormattingPipe();
    expect(pipe).toBeTruthy();
  });
});
