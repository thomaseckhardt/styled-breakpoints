import {
  up,
  down,
  between,
  only,
  invariant,
  withMinMedia,
  withMaxMedia,
  withMinAndMaxMedia,
  calcMinWidth,
  calcMaxWidth,
  makeErrorMessage,
  getBreakpointValue,
  getNextBreakpointName,
  getNextBreakpointValue,
  DEFAULT_BREAKS_MAP,
  DEFAULT_BREAKS,
} from '.';

const CUSTOM_THEME = {
  theme: {
    breakpoints: {
      tablet: '768px',
      desktop: '992px',
      lgDesktop: '1200px',
    },
  },
};

const CUSTOM_THEME_IS_EMPTY = {
  theme: {},
};

describe('up', () => {
  it('should return string with min breakpoint value and media query', () => {
    expect(up('tablet')(CUSTOM_THEME)).toEqual('@media (min-width: 768px)');
  });

  it('should return string with min breakpoint value and media query (from default theme)', () => {
    expect(up('tablet')(CUSTOM_THEME_IS_EMPTY)).toEqual(
      '@media (min-width: 768px)',
    );
  });
});

describe('down', () => {
  it('should return string with max breakpoint value and media query', () => {
    expect(down('tablet')(CUSTOM_THEME)).toEqual(
      '@media (max-width: 767.98px)',
    );
  });

  it('should return string with max breakpoint value and media query (from default theme)', () => {
    expect(down('tablet')(CUSTOM_THEME_IS_EMPTY)).toEqual(
      '@media (max-width: 767.98px)',
    );
  });
});

describe('between', () => {
  it('should returns a string containing the value of the minimum and maximum breakpoints and media query', () => {
    expect(between('tablet', 'desktop')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 768px) and (max-width: 1199.98px)',
    );
  });

  it('should returns a string containing the value of the minimum and maximum breakpoints and media query (from default theme)', () => {
    expect(between('tablet', 'desktop')(CUSTOM_THEME_IS_EMPTY)).toEqual(
      '@media (min-width: 768px) and (max-width: 1199.98px)',
    );
  });
});

describe('only', () => {
  it('should returns a string containing the minimum and maximum values of the current breakpoint and media query', () => {
    expect(only('tablet')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 768px) and (max-width: 991.98px)',
    );
  });

  it('should returns a string containing the minimum and maximum values of the current breakpoint and media query (from default theme)', () => {
    expect(only('tablet')(CUSTOM_THEME_IS_EMPTY)).toEqual(
      '@media (min-width: 768px) and (max-width: 991.98px)',
    );
  });
});

describe('getBreakpointValue', () => {
  it('return breakpoint value if breakpoint name is valid', () => {
    expect(getBreakpointValue('tablet', DEFAULT_BREAKS_MAP)).toEqual('768px');
  });

  it('show warn if the name of the breakpoint is invalid', () => {
    try {
      getBreakpointValue('!!!', DEFAULT_BREAKS_MAP);
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        `[styled-breakpoints]: '!!!' is invalid breakpoint name. Use 'tablet, desktop, lgDesktop'.`,
      );
    }
  });
});

describe('getNextBreakpointName', () => {
  it('return next breakpoint name if breakpoint name is valid', () => {
    expect(getNextBreakpointName('tablet')(DEFAULT_BREAKS_MAP)).toEqual(
      'desktop',
    );
  });

  it('show warn if the name of the breakpoint is invalid', () => {
    try {
      getNextBreakpointName('!!!')(DEFAULT_BREAKS_MAP);
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        `[styled-breakpoints]: '!!!' is invalid breakpoint name. Use 'tablet, desktop, lgDesktop'.`,
      );
    }
  });
});

describe('getNextBreakpointValue', () => {
  it('return next breakpoint value if breakpoint name is valid', () => {
    expect(getNextBreakpointValue('tablet', DEFAULT_BREAKS_MAP)).toEqual(
      '991.98px',
    );
  });

  it('show warn if the name of the breakpoint is invalid', () => {
    try {
      getNextBreakpointValue('!!!', DEFAULT_BREAKS_MAP);
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        `[styled-breakpoints]: '!!!' is invalid breakpoint name. Use 'tablet, desktop'.`,
      );
    }
  });

  it('show warn if the breakpoint cannot be used ', () => {
    try {
      getNextBreakpointValue('lgDesktop', DEFAULT_BREAKS_MAP);
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        `[styled-breakpoints]: Don't use 'lgDesktop' because it doesn't have a maximum width. Use 'desktop'.`,
      );
    }
  });
});

describe('withMinMedia', () => {
  it('should return string containing the breakpoint value  with media query', () => {
    expect(withMinMedia('640px')).toEqual('@media (min-width: 640px)');
  });
});

describe('withMaxMedia', () => {
  it('should return string containing the breakpoint value  with media query', () => {
    expect(withMaxMedia('640px')).toEqual('@media (max-width: 640px)');
  });
});

describe('withMinAndMaxMedia', () => {
  it('should return string containing the breakpoint value  with media query', () => {
    expect(withMinAndMaxMedia('640px', '960px')).toEqual(
      '@media (min-width: 640px) and (max-width: 960px)',
    );
  });
});

describe('calcMinWidth', () => {
  it('calculate min with in pixels from default theme', () => {
    expect(calcMinWidth('desktop', DEFAULT_BREAKS)).toEqual('992px');
  });
});

describe('calcMaxWidth', () => {
  it('calculate max with in pixels from default theme', () => {
    expect(calcMaxWidth('tablet', DEFAULT_BREAKS)).toEqual('991.98px');
  });
});

describe('errorReporter', () => {
  it('return object Error with error message', () => {
    expect(invariant).toThrow();
  });
});

describe('makeErrorMessage', () => {
  it('return string with error message', () => {
    expect(makeErrorMessage('xs', DEFAULT_BREAKS_MAP)).toEqual(
      "'xs' is invalid breakpoint name. Use 'tablet, desktop, lgDesktop'.",
    );
  });
});
