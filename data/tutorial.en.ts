import type { LessonSection, LessonSubmodule, RustExercise } from "~/data/tutorial";

type ExerciseTextOverride = Partial<
  Pick<RustExercise, "title" | "goal" | "difficulty">
>;

type SubmoduleTextOverride = Partial<
  Pick<LessonSubmodule, "title" | "summary">
> & {
  exercises?: Record<string, ExerciseTextOverride>;
};

type SectionTextOverride = Partial<
  Pick<LessonSection, "badge" | "title" | "summary">
> & {
  submodules?: Record<string, SubmoduleTextOverride>;
};

export const englishOverviewCards = [
  {
    title: "Rust learning is layered",
    body:
      "Do not read Rust as a pile of syntax. Build it in order: how the compiler works, how data lives in memory, and then how safe, clear APIs are designed.",
  },
  {
    title: "Compile errors are part of the lesson",
    body:
      "The Rust compiler is strict, and that is exactly why it is great for learning. Error messages do not only say the program is wrong, they also point you toward the next fix.",
  },
  {
    title: "The best practice loop is edit-run-refine",
    body:
      "Each module is broken into smaller submodules. After reading the idea and its example, you immediately repair broken code that matches that specific concept.",
  },
];

export const englishRoadmapPhases = [
  {
    title: "Phase 1: language grammar",
    body:
      "Understand let, mut, scalar types, tuples, arrays, functions, if, and loops. This is where you build your first feel for Rust syntax.",
  },
  {
    title: "Phase 2: data flow",
    body:
      "Move into String, &str, ownership, borrowing, slices, and the way the compiler keeps references valid. This is the phase that most clearly separates Rust from many other languages.",
  },
  {
    title: "Phase 3: building models",
    body:
      "Use structs, enums, match, modules, traits, and generics to write more expressive code. The target is not only working code, but code that is also clean and readable.",
  },
  {
    title: "Phase 4: library and tooling",
    body:
      "Finish with collections, iterators, error handling, lifetimes, smart pointers, and macros. At this point you begin combining earlier concepts into larger patterns.",
  },
];

export const englishSectionTextOverrides: Record<string, SectionTextOverride> = {
  setup: {
    badge: "Module 1",
    title: "Setup, Cargo, and how a Rust project works",
    summary:
      "Rust does not begin with syntax. It begins with workflow. You need to see how the toolchain, package manager, build system, test runner, and dependency management all meet inside Cargo.",
    submodules: {
      "setup-environment": {
        title: "Toolchain, rustup, and the first entry point",
        summary:
          "This submodule focuses on the first things that should feel natural: the compiler is available, the project is created successfully, and src/main.rs truly acts as the program entry point.",
        exercises: {
          "setup-main-entry": {
            title: "Fix the first entry point",
            goal: "Repair the main function and its output macro so the program can run.",
          },
        },
      },
      "setup-cargo-cycle": {
        title: "Reading the cargo check, run, test, and build cycle",
        summary:
          "At this stage you connect Cargo commands to real activity: checking syntax, running the program, testing behavior, and preparing a release binary.",
        exercises: {
          "setup-helper-function": {
            title: "Move logic into a small function",
            goal: "Fix the helper function signature so main can use it to print the crate name.",
          },
        },
      },
      "setup-project-map": {
        title: "Reading Cargo.toml, src, and a small verification flow",
        summary:
          "After the toolchain and basic commands feel familiar, you should be able to read the minimum project layout and verify small assumptions about the program.",
        exercises: {
          "setup-assert-layout": {
            title: "Validate the project layout with assert_eq!",
            goal: "Fix the assert_eq! call and helper invocation so the program passes verification and prints the layout status.",
          },
        },
      },
    },
  },
  syntax: {
    badge: "Module 2",
    title: "Variables, data types, numbers, tuples, arrays, and scope",
    summary:
      "This module builds comfort with the most basic Rust grammar: variable binding, primitive and compound data, comments, numbers, and simple boolean logic.",
    submodules: {
      "syntax-mutability": {
        title: "let, mut, and explicit value changes",
        summary:
          "Rust makes variable changes explicit. This submodule helps you see the difference between values that stay fixed and values that are expected to change through the flow.",
        exercises: {
          "syntax-mut-counter": {
            title: "Mutable counter",
            goal: "Fix the mutable binding so the counter can be incremented and printed.",
          },
        },
      },
      "syntax-types": {
        title: "const, tuples, arrays, and reading types deliberately",
        summary:
          "The goal here is not only to know the syntax, but to read the role of each type: fixed constant, grouped values, and ordered data with a stable size.",
        exercises: {
          "syntax-const-type": {
            title: "A const needs a type",
            goal: "Fix the constant declaration so the compiler can read its type and the program can print it.",
          },
        },
      },
      "syntax-comments-numbers": {
        title: "Comments, numbers, and numeric operations you can scan quickly",
        summary:
          "This submodule mixes practical grammar pieces that appear all the time: comments, numeric literals, and arithmetic expressions that should stay easy to read.",
        exercises: {
          "syntax-numeric-operations": {
            title: "Clean up the numeric expression",
            goal: "Repair the arithmetic expression so the invoice total can be calculated and printed.",
          },
        },
      },
      "syntax-boolean-logic": {
        title: "Booleans, comparison operators, and basic logic",
        summary:
          "Boolean values become useful once they drive real decisions. This submodule ties comparisons and logical operators to simple program flow.",
        exercises: {
          "syntax-boolean-operators": {
            title: "Complete the boolean logic",
            goal: "Fix the boolean expression so the final condition can be evaluated correctly.",
          },
        },
      },
    },
  },
  ownership: {
    badge: "Module 3",
    title: "Strings, stack vs heap, ownership, borrowing, and slices",
    summary:
      "This module is where Rust begins to feel different. You learn how values move, when references are safer, and how slices let you view part of a value without owning it.",
    submodules: {
      "ownership-borrowing": {
        title: "String vs &str and borrowing without moving data",
        summary:
          "This part clarifies the split between owned string data and borrowed string views so you can read function signatures without confusion.",
        exercises: {
          "ownership-borrow-word": {
            title: "Borrow a string",
            goal: "Fix the function call so the word is borrowed instead of moved away from the caller.",
          },
        },
      },
      "ownership-mutable-borrow": {
        title: "Mutable borrowing and controlled data changes",
        summary:
          "Borrowing can also allow mutation, as long as the borrowing rules stay explicit and limited.",
        exercises: {
          "ownership-mutable-borrow": {
            title: "Mutable borrow for String",
            goal: "Repair the function call so the String can be borrowed mutably and updated in place.",
          },
        },
      },
      "ownership-memory-moves": {
        title: "Stack, heap, moves, and ownership inside functions",
        summary:
          "This section ties the memory model to function calls, so moves stop feeling random and start feeling structural.",
        exercises: {
          "ownership-function-move": {
            title: "Return ownership from a function",
            goal: "Fix the function so ownership can move into it and back out through the return value.",
          },
        },
      },
      "ownership-slices": {
        title: "Slices and string slices for partial data access",
        summary:
          "Slices let you borrow only part of a value. This is one of the most practical tools for reading strings and sequences safely.",
        exercises: {
          "ownership-string-slice": {
            title: "Return the correct string slice",
            goal: "Repair the function so it returns a valid string slice from the original input.",
          },
        },
      },
    },
  },
  "control-flow": {
    badge: "Module 4",
    title: "If expressions, loops, while, for, ranges, functions, recursion",
    summary:
      "This module focuses on flow control in its practical Rust form: if as an expression, loop families, and small functions that return clear results.",
    submodules: {
      "control-flow-if-expression": {
        title: "if as an expression that returns a value",
        summary:
          "Rust lets if produce a value directly. This changes the way you write assignments and makes branching feel more expression-driven.",
        exercises: {
          "control-flow-if-expression": {
            title: "Complete the if expression",
            goal: "Fix the if expression so the selected status value can be stored and printed.",
          },
        },
      },
      "control-flow-loops": {
        title: "while, for, and ranges for clear iteration",
        summary:
          "Iteration should feel deliberate, not accidental. This submodule compares the common loop shapes and the role of ranges in them.",
        exercises: {
          "control-flow-while-block": {
            title: "Close the while block correctly",
            goal: "Repair the while loop block so the counter can advance and the final value can be printed.",
          },
        },
      },
      "control-flow-functions": {
        title: "Functions, parameters, return values, and small recursion",
        summary:
          "This section connects signatures, return values, and recursive thinking through small examples you can still read end to end.",
        exercises: {
          "control-flow-factorial": {
            title: "Recursive factorial signature",
            goal: "Fix the factorial function signature so recursion and the final output work correctly.",
          },
        },
      },
    },
  },
  modeling: {
    badge: "Module 5",
    title: "Structs, enums, methods, pattern matching, type aliases",
    summary:
      "Here you move from isolated syntax into data modeling. Rust starts to feel more expressive once your states and shapes are named clearly.",
    submodules: {
      "modeling-struct-method": {
        title: "Structs, named fields, and clean methods",
        summary:
          "A struct becomes useful when fields and methods describe one small domain object clearly and consistently.",
        exercises: {
          "modeling-struct-method": {
            title: "Method on a struct",
            goal: "Fix the method declaration so the struct can compute and print its own area.",
          },
        },
      },
      "modeling-enum-match": {
        title: "Enums and match for explicit state",
        summary:
          "Enums make state modeling more honest. Instead of many booleans, you describe one set of valid states and handle them exhaustively.",
        exercises: {
          "modeling-match-status": {
            title: "Match a status value",
            goal: "Repair the match arm syntax so the enum state can be read and printed correctly.",
          },
        },
      },
      "modeling-type-alias": {
        title: "Type aliases for naming data intent",
        summary:
          "A type alias does not create a new runtime shape, but it does make intent visible in function signatures and domain terms.",
        exercises: {
          "modeling-type-alias-user-id": {
            title: "Close the type alias correctly",
            goal: "Fix the type alias declaration so the function can use it to print a user identity.",
          },
        },
      },
    },
  },
  abstraction: {
    badge: "Module 6",
    title: "Modules, crates, visibility, traits, generics, where clauses",
    summary:
      "As a project grows, structure matters. This module helps you organize code, define behavior contracts, and reduce duplication with generics.",
    submodules: {
      "abstraction-traits": {
        title: "Traits as behavior contracts",
        summary:
          "This submodule frames a trait as an API contract for shared behavior, not as extra syntax to memorize.",
        exercises: {
          "abstraction-trait-impl": {
            title: "Trait implementation",
            goal: "Fix the trait implementation so the method has a valid declaration.",
          },
        },
      },
      "abstraction-generics": {
        title: "Generic functions for healthy duplication reduction",
        summary:
          "After traits, generics help you write logic that works across multiple types as long as the operation really is the same.",
        exercises: {
          "abstraction-generic-function": {
            title: "Add the generic parameter",
            goal: "Fix the function signature so the compiler recognizes the generic type parameter.",
          },
        },
      },
      "abstraction-modules": {
        title: "Modules, crates, and clean visibility",
        summary:
          "Before abstractions feel useful, the code itself needs clear boundaries. This section links modules, pub, and the idea of a crate as one project unit.",
        exercises: {
          "abstraction-module-pub": {
            title: "Expose the needed module function",
            goal: "Fix the function visibility so it can be called from outside the module.",
          },
        },
      },
    },
  },
  stdlib: {
    badge: "Module 7",
    title: "String API, Option, closures, iterators, formatting",
    summary:
      "This module is highly practical because it touches everyday work: text handling, optional values, small closures, iterators, and formatting.",
    submodules: {
      "stdlib-option": {
        title: "Option and match for data that may be empty",
        summary:
          "This submodule trains you to model absence explicitly. Instead of hidden nulls, Rust forces emptiness to be part of the program model.",
        exercises: {
          "stdlib-option-match": {
            title: "Match on Option",
            goal: "Fix the match arms so the Option value can be returned correctly.",
          },
        },
      },
      "stdlib-iterators": {
        title: "Iterators and declarative data transforms",
        summary:
          "Once data can be iterated, iterators let you transform it without writing long manual loops. The goal here is to read method chains one step at a time.",
        exercises: {
          "stdlib-iterator-collect": {
            title: "Complete the iterator chain",
            goal: "Fix the iterator chain syntax so the transformed Vec can be built and printed.",
          },
        },
      },
      "stdlib-string-formatting": {
        title: "String API, text manipulation, and formatting",
        summary:
          "Strings in Rust often appear together with small text methods and formatting macros. This section makes that flow feel natural.",
        exercises: {
          "stdlib-format-macro": {
            title: "Use format! correctly",
            goal: "Fix the formatting macro so the greeting string can be built and printed.",
          },
        },
      },
    },
  },
  collections: {
    badge: "Module 8",
    title: "Sequences, Maps, Sets, and standard collections",
    summary:
      "This module gives collections their own dedicated space so data structure choice becomes clearer. The target is not memorizing APIs, but understanding when to use ordered data, key-value storage, or unique sets.",
    submodules: {
      "collections-sequence": {
        title: "Sequences with arrays, slices, and Vec",
        summary:
          "This submodule groups ordered data structures together so you can tell the difference between fixed-size data, borrowed views, and growable buffers.",
        exercises: {
          "collections-sequence-push": {
            title: "Add an item to the sequence",
            goal: "Fix the Vec declaration so a new item can be pushed and the final length can be printed.",
          },
        },
      },
      "collections-maps": {
        title: "Maps with HashMap for key-value relationships",
        summary:
          "If sequences are good for order, maps are good for lookup by name or identifier. This section builds that instinct clearly.",
        exercises: {
          "collections-hashmap-basic": {
            title: "Fill a HashMap and read the value",
            goal: "Fix the HashMap declaration so data can be inserted and read with the correct key.",
          },
        },
      },
      "collections-sets": {
        title: "Sets with HashSet for unique values",
        summary:
          "This submodule introduces collections where uniqueness matters more than order or key-value pairs. HashSet is especially useful for deduplication and membership checks.",
        exercises: {
          "collections-hashset-contains": {
            title: "Insert a unique tag into HashSet",
            goal: "Fix the HashSet declaration so the tag can be inserted and its membership can be checked.",
          },
        },
      },
    },
  },
  advanced: {
    badge: "Module 9",
    title: "Result, lifetimes, derive, smart pointers, static, macros",
    summary:
      "The final section is not meant to be memorized in one pass. It is meant to help you understand how Rust handles errors, reference lifetimes, and more complex ownership patterns.",
    submodules: {
      "advanced-result": {
        title: "Result and explicit success-failure paths",
        summary:
          "This submodule helps you separate normal recoverable errors from fatal crashes. Result makes both paths explicit in the function signature.",
        exercises: {
          "advanced-result-ok": {
            title: "Result and the closing parenthesis",
            goal: "Fix the Result-returning function so its success path is valid.",
          },
        },
      },
      "advanced-question-mark": {
        title: "The ? operator and clean error propagation",
        summary:
          "When several Result-returning functions are chained together, the ? operator removes a lot of boilerplate. The key requirement is that the caller returns a compatible type too.",
        exercises: {
          "advanced-question-mark-main": {
            title: "main using the ? operator",
            goal: "Fix main so it can use the ? operator when calling a Result-returning function.",
          },
        },
      },
      "advanced-lifetimes": {
        title: "Lifetimes for clearer reference relationships",
        summary:
          "Lifetimes are not extra magic. They are the way the compiler understands how references relate to one another.",
        exercises: {
          "advanced-longest-lifetime": {
            title: "Add the lifetime to longest",
            goal: "Fix the function signature so the compiler understands which reference is returned.",
          },
        },
      },
      "advanced-attributes-derive": {
        title: "Attributes and derive for compile-time metadata",
        summary:
          "Attributes give the compiler extra instructions. Derive is the most practical form because it can add common trait implementations without a long boilerplate block.",
        exercises: {
          "advanced-derive-debug": {
            title: "Enable derive Debug",
            goal: "Fix the derive attribute so the struct can be printed with Debug formatting.",
          },
        },
      },
      "advanced-smart-pointers": {
        title: "Smart pointers, dereferencing, cleanup, and shared ownership",
        summary:
          "This submodule acts as a bridge into richer pointer topics. Box, Rc, RefCell, and cleanup rules each solve different ownership problems in explicit ways.",
        exercises: {
          "advanced-rc-clone": {
            title: "Shared ownership with Rc",
            goal: "Fix the Rc::clone call so two owners can safely use the same value.",
          },
        },
      },
      "advanced-static-macro": {
        title: "Static values and macros for globals and pattern expansion",
        summary:
          "Static values and macros often appear later because their effect is wider. This section keeps them small and safe so the pattern is easier to see.",
        exercises: {
          "advanced-static-macro-call": {
            title: "Call the macro inside static",
            goal: "Fix the static initialization so the macro is called correctly and its result can be printed.",
          },
        },
      },
    },
  },
};
