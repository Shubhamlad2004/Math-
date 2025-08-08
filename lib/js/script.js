// Base Number Converter Class
class BaseConverter {
  constructor() {
    this.input = document.getElementById('inputValue');
    this.output = document.getElementById('outputValue');
    this.from = document.getElementById('fromType');
    this.to = document.getElementById('toType');

    if (this.input && this.output && this.from && this.to) {
      this.input.addEventListener('input', () => this.convert());
      this.from.addEventListener('change', () => this.convert());
      this.to.addEventListener('change', () => this.convert());
    }
  }

  convert() {
    let input = this.input.value.trim();
    let from = this.from.value;
    let to = this.to.value;

    if (!input) {
      this.output.value = '';
      return;
    }

    try {
      let decimal;

      if (from === 'binary' && /^[01]+$/.test(input)) {
        decimal = parseInt(input, 2);
      } else if (from === 'decimal' && /^\d+$/.test(input)) {
        decimal = parseInt(input, 10);
      } else if (from === 'hex' && /^[0-9a-fA-F]+$/.test(input)) {
        decimal = parseInt(input, 16);
      }
      else{
        throw new Error("Not a valid hexadecimal number");
      }

      if (isNaN(decimal)) throw new Error("Invalid input");

      let result;
      if (to === 'binary') {
        result = decimal.toString(2);
      } else if (to === 'decimal') {
        result = decimal.toString(10);
      } else if (to === 'hex') {
        result = decimal.toString(16).toUpperCase();
      }

      this.output.value = result;
    } catch (e) {
      this.output.value = 'Error: ' + e.message;
    }
  }
}

// IP Converter Class
class IPConverter {
  constructor() {
    this.input = document.getElementById('ipInput');
    this.output = document.getElementById('ipOutput');
    this.from = document.getElementById('ipFrom');
    this.to = document.getElementById('ipTo');

    if (this.input && this.output && this.from && this.to) {
      this.input.addEventListener('input', () => this.convert());
      this.from.addEventListener('change', () => this.convert());
      this.to.addEventListener('change', () => this.convert());
    }
  }

  convert() {
    let input = this.input.value.trim();
    let from = this.from.value;
    let to = this.to.value;

    try {
      if (from === 'ipv4' && to === 'decimal') {
        const parts = input.split('.');
        if (parts.length !== 4) throw new Error('Invalid IPv4');
        const decimal = parts.reduce((acc, part, index) => {
          if (isNaN(part) || part < 0 || part > 255) throw new Error("Invalid segment");
          return acc + parseInt(part) * Math.pow(256, 3 - index);
        }, 0);
        this.output.value = decimal;
      } else if (from === 'decimal' && to === 'ipv4') {
        let num = parseInt(input);
        if (isNaN(num) || num < 0 || num > 4294967295) throw new Error('Invalid decimal');
        const ipv4 = [
          (num >>> 24) & 255,
          (num >>> 16) & 255,
          (num >>> 8) & 255,
          num & 255
        ].join('.');
        this.output.value = ipv4;
      } else {
        this.output.value = 'Unsupported';
      }
    } catch (e) {
      this.output.value = 'Error: ' + e.message;
    }
  }
}

// Initialization Logic
window.addEventListener('DOMContentLoaded', () => {
  const bodyClass = document.body.className;

  if (bodyClass.includes('base-converter')) {
    new BaseConverter();
  } else if (bodyClass.includes('ip-converter')) {
    new IPConverter();
  }
});
