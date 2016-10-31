export function arrayChunk(input, size) {
  for(var x, i = 0, c = -1, l = input.length, n = []; i < l; i++){
    (x = i % size) ? n[c][x] = input[i] : n[++c] = [input[i]];
  }
  return n;
}
