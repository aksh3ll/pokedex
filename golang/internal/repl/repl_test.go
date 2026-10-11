package repl

import "testing"

func TestCleanInput(t *testing.T) {
    cases := []struct {
        input    string
        expected []string
    }{
        {
            input:    "  hello  world  ",
            expected: []string{"hello", "world"},
        },
        {
            input:    "   leading and trailing spaces   ",
            expected: []string{"leading", "and", "trailing", "spaces"},
        },
        {
            input:    "Multiple    Spaces   Between   WORDS",
            expected: []string{"multiple", "spaces", "between", "words"},
        },
        {
            input:    "",
            expected: []string{},
        },
    }
    for _, c := range cases {
        actual := cleanInput(c.input)
        if !equalSlices(actual, c.expected) {
            t.Errorf("cleanInput(%q) == %q, expected %q", c.input, actual, c.expected)
        }
    }
}

func equalSlices(a, b []string) bool {
    if len(a) != len(b) {
        return false
    }
    for i := range a {
        if a[i] != b[i] {
            return false
        }
    }
    return true
}
