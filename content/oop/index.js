export default {
  title: "OOP",
  icon: "🧩",
  sections: [
    {
      title: "⚡ Quick Revision — every concept in two lines",
      items: [
        { type: "concept", id: "qr-1", diagram: "bundle", diagramCaption: "The object bundles its own data and behavior.", title: "1 — What is OOP", body: ["OOP models real-world things as objects that bundle data and behavior together, built on four pillars: encapsulation, abstraction, inheritance, polymorphism.", "Example: a Car object holds its own color/speed and knows how to drive() itself, instead of separate loose variables and functions."] },
        { type: "concept", id: "qr-2", diagram: "blueprint", diagramCaption: "One blueprint, many independent objects.", title: "2 — Classes & Objects", body: ["A class is a blueprint; an object is a real instance created from it with `new`, with its own independent data.", "Example: Car myCar = new Car(); creates one real Car object from the Car blueprint."] },
        { type: "concept", id: "qr-3", diagram: "construct", diagramCaption: "The constructor sets starting values the instant an object is born.", title: "3 — Constructors", body: ["A constructor is a special same-named method that runs once when an object is created, to set up its starting values.", "Example: public Car(String color) { this.color = color; } runs automatically inside new Car(\"red\")."] },
        { type: "concept", id: "qr-4", diagram: "encapsulate", diagramCaption: "Private data behind a lock, public doors in and out.", title: "4 — Encapsulation", body: ["Make fields private and only expose controlled access through public getter/setter methods, so the class can enforce its own rules.", "Example: deposit()/withdraw() control balance instead of letting outside code set it directly."] },
        { type: "concept", id: "qr-5", diagram: "abstract", diagramCaption: "One simple button — the machinery stays hidden.", title: "5 — Abstraction", body: ["Show only what's necessary through a simple interface, and hide the complicated implementation behind it.", "Example: myCar.start() hides fuel-checking and ignition logic behind one simple method call."] },
        { type: "concept", id: "qr-6", diagram: "inherit", diagramCaption: "A child class inherits the parent's fields and methods.", title: "6 — Inheritance", body: ["A child class reuses and extends a parent class's fields and methods with `extends`, for genuine \"is-a\" relationships.", "Example: class Dog extends Animal gives Dog everything Animal has, for free."] },
        { type: "concept", id: "qr-7", diagram: "polymorph", diagramCaption: "Same call, different behavior per object.", title: "7 — Polymorphism", body: ["The same method call behaves differently depending on the actual object it runs on, mainly through method overriding.", "Example: Animal myPet = new Dog(); myPet.makeSound(); runs Dog's version, not Animal's."] },
        { type: "concept", id: "qr-8", diagram: "overloadOverride", diagramCaption: "Overload: same class, different params. Override: parent to child, same signature.", title: "8 — Overloading vs Overriding", body: ["Overloading = same name, different parameters, same class, decided at compile time. Overriding = same name, same parameters, parent/child classes, decided at runtime.", "Example: add(int,int) and add(double,double) overload each other; Dog's makeSound() overrides Animal's."] },
        { type: "concept", id: "qr-9", diagram: "abstractVsInterface", diagramCaption: "Abstract class: single inheritance, shared code. Interface: many, pure contract.", title: "9 — Abstract Classes vs Interfaces", body: ["Abstract classes are partial base classes for closely related subclasses (single inheritance, can share real code); interfaces are pure contracts a class can implement many of.", "Example: abstract class Shape vs interface Payable — a class can extend only one Shape but implement many interfaces."] },
        { type: "concept", id: "qr-10", diagram: "accessRings", diagramCaption: "private is the innermost ring, public the outermost.", title: "10 — Access Modifiers", body: ["private/default/protected/public control who can see a field or method, from most to least restrictive.", "Example: private double balance; can only be touched from inside its own class."] },
        { type: "concept", id: "qr-11", diagram: "staticShared", diagramCaption: "static shares one copy across every object.", title: "11 — static", body: ["static means a field or method belongs to the class itself, shared by every object, not a separate copy per object.", "Example: static int totalCars; is the exact same shared counter for every Car object."] },
        { type: "concept", id: "qr-12", diagram: "thisSuper", diagramCaption: "this points to me; super points to my parent.", title: "12 — this & super", body: ["`this` refers to the current object; `super` refers to the parent class, used to call its constructor or its overridden method.", "Example: super(name); runs Animal's constructor before Dog's own constructor body continues."] },
        { type: "concept", id: "qr-13", diagram: "objectRoot", diagramCaption: "Every class quietly extends Object.", title: "13 — Object class methods", body: ["Every class inherits toString(), equals(), and hashCode() from Object, but they usually need overriding for meaningful, content-based behavior.", "Example: overriding equals() lets two Car objects with the same color be considered equal, not just identical in memory."] },
        { type: "concept", id: "qr-14", diagram: "compositionVsInheritance", diagramCaption: "is-a extends a class; has-a contains one.", title: "14 — Composition vs Inheritance", body: ["Inheritance models \"is-a\" by extending a class; composition models \"has-a\" by containing another object as a field — favor composition when unsure.", "Example: class Car { private Engine engine; } — a Car has an Engine, it isn't one."] },
        { type: "concept", id: "qr-15", diagram: "solid", diagramCaption: "Five habits for maintainable classes.", title: "15 — SOLID", body: ["Five principles for maintainable OOP: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.", "Example: splitting one Employee class into Employee, PayCalculator, and EmployeeRepository follows Single Responsibility."] }
      ]
    },

    {
      title: "Topic 1 · What is OOP? — the big picture",
      items: [
        {
          type: "concept",
          id: "intro-1",
          diagram: "objectBundleCar",
          diagramCaption: "One Car object, holding both its data and its behavior.",
          title: "What does OOP actually mean?",
          body: [
            "OOP stands for **Object-Oriented Programming** — a way of writing code where you model real-world things as \"objects\" that bundle together data (what the thing has) and behavior (what the thing can do), instead of writing one long list of instructions.",
            "Example: instead of separate variables like carColor, carSpeed, and separate functions like startCar(), stopCar(), you create one Car object that holds its own color and speed, and knows how to start and stop itself."
          ]
        },
        {
          type: "concept",
          id: "intro-2",
          important: true,
          diagram: "proceduralMess",
          diagramCaption: "Procedural code scatters data and logic; OOP bundles them.",
          title: "Why does OOP exist? — the problem it solves",
          body: [
            "Before OOP, most code was written top-to-bottom as a list of steps (called procedural programming) — this works fine for small programs, but gets messy fast as programs grow: data and the functions that use it live far apart, and it's easy to break something by changing shared data from many places.",
            "**OOP fixes this by grouping related data and behavior together into one unit (an object), so each piece of your program is self-contained and easier to reason about, reuse, and change safely.**"
          ]
        },
        {
          type: "list",
          id: "intro-3",
          diagram: "fourPillars",
          diagramCaption: "Every OOP idea traces back to one of these four pillars.",
          title: "The four pillars of OOP — the words every interview circles around",
          points: [
            "Encapsulation — bundling data and the methods that work on it together, and hiding the internal details from the outside world.",
            "Abstraction — showing only what's necessary and hiding complex implementation details.",
            "Inheritance — letting one class reuse and extend the code of another class.",
            "Polymorphism — letting the same action (method call) behave differently depending on the object it's called on."
          ]
        },
        {
          type: "concept",
          id: "intro-4",
          diagram: "carAnalogy",
          diagramCaption: "The same four pillars, spotted in an everyday car.",
          title: "Real-world analogy — a car",
          body: "Think of a real car. You don't need to know how the engine ignites fuel to drive it — you just use the steering wheel and pedals (abstraction). The engine's inner wiring is hidden under the hood (encapsulation). A \"Sports Car\" and a \"Truck\" are both types of \"Vehicle\" and share basic vehicle features (inheritance). Pressing the accelerator does something different in each vehicle type, even though it's the same action (polymorphism). Every one of the four pillars already makes sense to you from everyday life — OOP just applies the same ideas to code."
        },
        {
          type: "qa",
          id: "intro-5",
          diagram: "puzzleMerge",
          diagramCaption: "Four pillars, one sentence: OOP.",
          question: "What is OOP, in one sentence you could say out loud in an interview?",
          answer: "OOP is a programming style that models real-world things as objects — bundles of data and behavior — built around four core ideas: encapsulation, abstraction, inheritance, and polymorphism."
        },
        {
          type: "qa",
          id: "intro-6",
          diagram: "proceduralVsOop",
          diagramCaption: "A step-list of functions versus one self-managing object.",
          question: "What's the difference between procedural and object-oriented programming?",
          answer: "Procedural programming is a sequence of functions/steps that operate on shared data. OOP groups data and the functions that operate on it into objects, so each object manages its own data — making programs easier to organize, reuse, and maintain as they grow."
        },
        {
          type: "concept",
          id: "intro-7",
          important: true,
          takeaway: true,
          diagram: "pillarsHoldObject",
          diagramCaption: "The four pillars hold the object up.",
          title: "Key takeaway",
          body: "OOP means organizing code around objects — things that hold their own data and know how to act on it — built on four pillars: encapsulation, abstraction, inheritance, and polymorphism. Everything else in OOP is really just a deeper look at these four ideas."
        }
      ]
    },

    {
      title: "Topic 2 · Classes & Objects — the absolute basics",
      items: [
        {
          type: "concept",
          id: "obj-1",
          diagram: "houseBlueprint",
          diagramCaption: "Same blueprint, three independent, real houses.",
          title: "A class is a blueprint, an object is the real thing",
          body: [
            "A class is a blueprint or template — it describes what something will have (its data) and what it will be able to do (its behavior), but it isn't a real thing by itself.",
            "An object is an actual thing built from that blueprint, sitting in memory, with real values.",
            "Analogy: the blueprint for a house is not a house you can live in — it's a plan. Once you build a house from that blueprint, you have a real house. You can build many houses (objects) from the same blueprint (class)."
          ]
        },
        {
          type: "code",
          id: "obj-2",
          diagram: "carClassUml",
          diagramCaption: "One class box: name, fields, and methods.",
          title: "Your first class, in Java",
          code: "public class Car {\n    // fields (the data every Car has)\n    String color;\n    int speed;\n\n    // method (something every Car can do)\n    void drive() {\n        System.out.println(\"The \" + color + \" car is driving at \" + speed + \" km/h\");\n    }\n}",
          note: "This is just the blueprint. No actual car exists yet — Car is just a description of what a car looks like in our program."
        },
        {
          type: "code",
          id: "obj-3",
          diagram: "twoInstances",
          diagramCaption: "Two new Car() calls make two separate, independent objects.",
          title: "Creating (instantiating) objects from the class",
          code: "public class Main {\n    public static void main(String[] args) {\n        Car myCar = new Car();\n        myCar.color = \"red\";\n        myCar.speed = 100;\n        myCar.drive(); // The red car is driving at 100 km/h\n\n        Car anotherCar = new Car();\n        anotherCar.color = \"blue\";\n        anotherCar.speed = 60;\n        anotherCar.drive(); // The blue car is driving at 60 km/h\n    }\n}",
          note: "**new Car() is the moment an actual object is created from the blueprint** — this is called instantiation, and myCar/anotherCar are two completely separate objects (instances) built from the same class. Changing myCar.color never affects anotherCar.color."
        },
        {
          type: "concept",
          id: "obj-4",
          important: true,
          diagram: "fieldsMethodsSplit",
          diagramCaption: "Every class splits into a fields compartment and a methods compartment.",
          title: "Fields and methods — the two things every class has",
          body: [
            "Fields (also called member variables or attributes) are the data a class holds — like color and speed above. Each object gets its own copy of these fields.",
            "Methods are the actions/behaviors a class can perform — like drive() above. Methods usually work using the object's own fields."
          ]
        },
        {
          type: "concept",
          id: "obj-5",
          diagram: "messyVarsVsClass",
          diagramCaption: "Scattered variables versus one clean class making car1, car2, car3.",
          title: "Why bother with classes at all?",
          body: "Without classes, you'd need separate variables for every car — car1Color, car1Speed, car2Color, car2Speed — and separate copies of every function. A class lets you define the shape of \"a car\" once, and then create as many cars as you want from it, each keeping its own data automatically."
        },
        {
          type: "table",
          id: "obj-6",
          diagram: "classVsObjectIcons",
          diagramCaption: "Dashed = a class; solid = a real object.",
          title: "Vocabulary check — class vs object",
          headers: ["Term", "What it means"],
          rows: [
            ["Class", "the blueprint/template — written once in code"],
            ["Object", "a real instance built from the class, living in memory"],
            ["Instantiation", "the act of creating an object with `new`"],
            ["Instance", "another word for \"an object of a class\" — myCar is an instance of Car"]
          ]
        },
        {
          type: "qa",
          id: "obj-7",
          question: "What's the difference between a class and an object?",
          answer: "A class is a blueprint — it defines what fields and methods something will have, but doesn't exist as a real thing. An object is an actual instance created from that class using `new`, with its own real values in memory. You can create many objects from one class."
        },
        {
          type: "qa",
          id: "obj-8",
          diagram: "newCarSequence",
          diagramCaption: "The four steps Java runs behind new Car().",
          question: "What happens when you write `new Car()`?",
          answer: "Java allocates memory for a new Car object, sets its fields to default values (0, null, false, etc. depending on type), runs the constructor, and returns a reference to that new object — which you can store in a variable like `Car myCar = new Car();`."
        },
        {
          type: "concept",
          id: "obj-9",
          important: true,
          takeaway: true,
          diagram: "houseBlueprintTakeaway",
          diagramCaption: "Every object stands on the same blueprint, with its own data.",
          title: "Key takeaway",
          body: "A class is a blueprint that defines fields (data) and methods (behavior); an object is a real instance of that class created with `new`. Every object built from the same class has the same structure but its own independent data."
        }
      ]
    },

    {
      title: "Topic 3 · Constructors",
      items: [
        {
          type: "concept",
          id: "ctor-1",
          diagram: "objectBorn",
          diagramCaption: "The constructor runs once, at the exact moment of birth.",
          title: "What is a constructor?",
          body: [
            "A constructor is a special method that runs automatically the moment an object is created with `new` — its job is to set up the object's initial state.",
            "A constructor has the exact same name as the class, and no return type (not even void)."
          ]
        },
        {
          type: "code",
          id: "ctor-2",
          diagram: "ctorSetsFields",
          diagramCaption: "Two arguments flow straight into two fields, immediately.",
          title: "A class with a constructor",
          code: "public class Car {\n    String color;\n    int speed;\n\n    // constructor\n    public Car(String c, int s) {\n        color = c;\n        speed = s;\n    }\n\n    void drive() {\n        System.out.println(\"The \" + color + \" car is driving at \" + speed + \" km/h\");\n    }\n}",
          note: "Now creating a car forces you to supply a color and speed immediately: Car myCar = new Car(\"red\", 100); — no more forgetting to set a field after creating the object."
        },
        {
          type: "concept",
          id: "ctor-3",
          important: true,
          diagram: "defaultCtorTwoPanel",
          diagramCaption: "Write no constructor and get a free one; write any constructor and it disappears.",
          title: "The default constructor",
          body: [
            "If you don't write any constructor yourself, **Java silently gives your class an empty, no-argument constructor for free** — that's why `new Car()` worked back in Topic 2 even though we hadn't written a constructor yet.",
            "**The moment you write even one constructor yourself, Java stops giving you the free one.** If you then still need a no-argument way to create the object, you have to write that constructor explicitly too."
          ]
        },
        {
          type: "code",
          id: "ctor-4",
          diagram: "ctorOverloadDoors",
          diagramCaption: "Two constructor doors, two differently-configured Car objects.",
          title: "Constructor overloading — multiple ways to build the same object",
          code: "public class Car {\n    String color;\n    int speed;\n\n    public Car() {\n        color = \"white\";\n        speed = 0;\n    }\n\n    public Car(String c, int s) {\n        color = c;\n        speed = s;\n    }\n}\n\n// both of these work:\nCar basic = new Car();               // white, 0\nCar custom = new Car(\"red\", 100);    // red, 100",
          note: "This is called **constructor overloading** — the same class has multiple constructors with different parameter lists, and Java picks the right one based on what arguments you pass. Same idea as method overloading, covered in Topic 8."
        },
        {
          type: "concept",
          id: "ctor-5",
          diagram: "thisDisambiguation",
          diagramCaption: "this.color is the field; color alone is just the parameter.",
          title: "The `this` keyword inside a constructor",
          body: "When your constructor's parameter names match your field names, `this.fieldName` means \"the field that belongs to this specific object,\" while the plain name refers to the parameter: public Car(String color, int speed) { this.color = color; this.speed = speed; } — without `this`, `color = color;` would just assign the parameter to itself and leave the field untouched."
        },
        {
          type: "qa",
          id: "ctor-6",
          diagram: "ctorVsMethod",
          diagramCaption: "A constructor and a regular method follow very different rules.",
          question: "What is a constructor, and how is it different from a regular method?",
          answer: "A constructor is a special block of code that runs automatically when an object is created, used to set up its initial state. Unlike a regular method, it has the exact same name as the class, has no return type at all (not even void), and can only run once per object, at creation time."
        },
        {
          type: "qa",
          id: "ctor-7",
          question: "What is the default constructor, and when does Java NOT provide one?",
          answer: "If a class has no constructor written at all, Java automatically provides an empty, no-argument constructor. The moment you write any constructor yourself, Java stops providing the default one — so if you still need a no-argument constructor after adding others, you must write it explicitly."
        },
        {
          type: "concept",
          id: "ctor-8",
          important: true,
          takeaway: true,
          diagram: "ctorTakeaway",
          diagramCaption: "new Car(...) runs the constructor once, producing a ready-to-use object.",
          title: "Key takeaway",
          body: "A constructor is a special same-named, no-return-type method that runs once when an object is created, used to set up its starting values. Java gives you a free empty one only if you write none yourself."
        }
      ]
    },

    {
      title: "Topic 4 · Encapsulation",
      items: [
        {
          type: "concept",
          id: "enc-1",
          important: true,
          diagram: "capsuleBundle",
          diagramCaption: "Data and its methods bundled into one capsule, data hidden inside.",
          title: "What is encapsulation?",
          body: [
            "Encapsulation means **bundling data (fields) and the methods that use that data together inside one class, and hiding the internal details from outside code.**",
            "In practice, this almost always means: make your fields `private`, and only allow the outside world to read or change them through public methods you control."
          ]
        },
        {
          type: "code",
          id: "enc-2",
          diagram: "noGatekeeper",
          diagramCaption: "A public field lets an invalid value in with nothing to stop it.",
          title: "Without encapsulation — a real problem",
          code: "public class BankAccount {\n    public double balance; // public — anyone can touch this directly\n}\n\n// somewhere else in the program:\nBankAccount acc = new BankAccount();\nacc.balance = -5000; // legal! nothing stops this",
          note: "Because balance is public, any code anywhere in the program can set it directly, including to a nonsensical negative value. There's no way to enforce a rule like \"balance can never go below zero\" — nothing is checking."
        },
        {
          type: "code",
          id: "enc-3",
          diagram: "gatekeeperMethods",
          diagramCaption: "deposit() and withdraw() guard private balance on both sides.",
          title: "With encapsulation — the field is protected",
          code: "public class BankAccount {\n    private double balance; // hidden from outside\n\n    public void deposit(double amount) {\n        if (amount > 0) {\n            balance = balance + amount;\n        }\n    }\n\n    public void withdraw(double amount) {\n        if (amount > 0 && amount <= balance) {\n            balance = balance - amount;\n        }\n    }\n\n    public double getBalance() {\n        return balance;\n    }\n}",
          note: "Now balance can only change through deposit() and withdraw(), and both methods can enforce rules (no negative deposits, no overdrawing). **The class controls its own data — outside code can no longer put it into an invalid state.**"
        },
        {
          type: "concept",
          id: "enc-4",
          diagram: "getterSetterFlow",
          diagramCaption: "Getters read the field; setters check first, then write.",
          title: "Getters and setters",
          body: "The public methods used to read and change private fields have a standard naming pattern: getters (like getBalance()) return a field's value, and setters (like setColor(String c)) change a field's value, usually after checking that the new value makes sense. This pair is the most common way encapsulation is implemented in real Java code."
        },
        {
          type: "concept",
          id: "enc-5",
          important: true,
          diagram: "twoBenefits",
          diagramCaption: "Encapsulation keeps data valid and lets internals change safely.",
          title: "Why encapsulation matters — the actual benefit",
          body: [
            "**It protects your data from being put into an invalid state by code you don't control.** A bank account can enforce \"never below zero\" only if outside code is forced to go through deposit()/withdraw() instead of touching balance directly.",
            "It also means you can change how something works internally without breaking other code that uses your class — as long as the public methods keep working the same way, nobody outside needs to know or care what changed inside."
          ]
        },
        {
          type: "table",
          id: "enc-6",
          diagram: "encVocabIcons",
          diagramCaption: "One private field, two public doors: getter and setter.",
          title: "Encapsulation vocabulary",
          headers: ["Term", "Meaning"],
          rows: [
            ["private field", "a field only accessible from inside its own class"],
            ["getter", "a public method that returns a private field's value"],
            ["setter", "a public method that changes a private field's value, often with validation"],
            ["data hiding", "another name for the core idea of encapsulation"]
          ]
        },
        {
          type: "qa",
          id: "enc-7",
          question: "What is encapsulation, and why is it useful?",
          answer: "Encapsulation is bundling an object's data with the methods that operate on it, and hiding the data from outside access (usually by making fields private). It's useful because it lets the class enforce its own rules about what values are valid, and protects the internal data from being changed in unsafe ways by outside code."
        },
        {
          type: "qa",
          id: "enc-8",
          question: "If a field is private, how does outside code read or change it?",
          answer: "Through public getter and setter methods that the class itself provides — e.g. getBalance() to read, deposit()/withdraw() to change. This way the class stays in control of what changes are allowed."
        },
        {
          type: "concept",
          id: "enc-9",
          important: true,
          takeaway: true,
          diagram: "encapsulationTakeaway",
          diagramCaption: "Getters and setters are the only two doors to private data.",
          title: "Key takeaway",
          body: "Encapsulation means making fields private and only exposing controlled access through public methods (getters/setters), so a class can protect and enforce the rules around its own data instead of trusting outside code to do it correctly."
        }
      ]
    },

    {
      title: "Topic 5 · Abstraction",
      items: [
        {
          type: "concept",
          id: "abs-1",
          important: true,
          diagram: "simpleInterfaceHidesComplexity",
          diagramCaption: "One simple button; the wiring behind it stays hidden.",
          title: "What is abstraction?",
          body: [
            "Abstraction means **showing only the essential, relevant details to the user, and hiding the complicated implementation behind a simple interface.**",
            "You already use abstraction constantly outside of programming: you drive a car using a steering wheel and pedals without knowing how fuel injection works. You use a TV remote without knowing how infrared signals are encoded."
          ]
        },
        {
          type: "concept",
          id: "abs-2",
          important: true,
          diagram: "encapsulationVsAbstractionHides",
          diagramCaption: "Encapsulation hides data; abstraction hides complexity.",
          title: "Abstraction vs Encapsulation — the confusion everyone has",
          body: [
            "These two get mixed up constantly because they're related, but they solve different problems: **encapsulation is about hiding data (protecting the \"how it's stored\"). Abstraction is about hiding complexity (simplifying the \"how it works\").**",
            "Encapsulation is a technique (private fields + public methods). Abstraction is a design goal (expose only what's necessary). You use encapsulation as one of the tools to achieve abstraction."
          ]
        },
        {
          type: "code",
          id: "abs-3",
          diagram: "startHidesPrivateMethods",
          diagramCaption: "start() is public; checkFuel() and igniteEngine() stay private.",
          title: "Abstraction in code — a simple example",
          code: "public class Car {\n    private boolean engineRunning = false;\n\n    public void start() {\n        checkFuel();\n        igniteEngine();\n        engineRunning = true;\n        System.out.println(\"Car started!\");\n    }\n\n    private void checkFuel() { /* complex fuel-check logic */ }\n    private void igniteEngine() { /* complex ignition logic */ }\n}\n\n// the user only ever needs to know this:\nCar myCar = new Car();\nmyCar.start();",
          note: "start() is the simple interface. checkFuel() and igniteEngine() are marked private — real complexity hidden inside, exposed to the outside world as one simple action. The person calling myCar.start() doesn't need to know how starting actually works."
        },
        {
          type: "concept",
          id: "abs-4",
          diagram: "twoRoadsToAbstraction",
          diagramCaption: "Abstract classes and interfaces — two roads to the same goal.",
          title: "Two ways Java lets you achieve abstraction",
          body: "Java gives you two dedicated tools for abstraction: abstract classes and interfaces — both let you define \"what should exist\" without necessarily saying \"how it works,\" forcing other classes to fill in the details. These are covered in full in Topic 9, since they're substantial enough to deserve their own deep dive — but know for now that abstraction isn't just about private methods, it has these two dedicated language features too."
        },
        {
          type: "table",
          id: "abs-5",
          title: "Abstraction vs Encapsulation, side by side",
          headers: ["Encapsulation", "Abstraction"],
          rows: [
            ["Hides data (the internal state/fields)", "Hides complexity (the internal logic/steps)"],
            ["Achieved with private fields + public getters/setters", "Achieved with abstract classes, interfaces, and simple public methods"],
            ["Answers: \"who can access this data?\"", "Answers: \"how much does the user need to know?\""]
          ]
        },
        {
          type: "qa",
          id: "abs-6",
          question: "What is abstraction?",
          answer: "Abstraction means exposing only the necessary, relevant details to the user of a class, while hiding the complex internal implementation. It lets you interact with something simple (like a start() method) without needing to understand everything happening underneath it."
        },
        {
          type: "qa",
          id: "abs-7",
          question: "What's the difference between abstraction and encapsulation?",
          answer: "Encapsulation hides an object's data (private fields, accessed through public methods) to protect it. Abstraction hides complexity (the internal logic and steps) so users of a class only need to know a simple interface. Encapsulation is a technique you use partly in service of achieving abstraction."
        },
        {
          type: "concept",
          id: "abs-8",
          important: true,
          takeaway: true,
          diagram: "abstractionTakeaway",
          diagramCaption: "One call in, the complexity stays hidden.",
          title: "Key takeaway",
          body: "Abstraction means showing only what's necessary and hiding complicated implementation details behind a simple interface — like a car's steering wheel hiding the engine's complexity. It's different from encapsulation, which hides data specifically, not logic."
        }
      ]
    },

    {
      title: "Topic 6 · Inheritance",
      items: [
        {
          type: "concept",
          id: "inh-1",
          important: true,
          diagram: "parentChildExtends",
          diagramCaption: "A child class extends a parent, free fields and methods included.",
          title: "What is inheritance?",
          body: [
            "Inheritance lets one class **reuse the fields and methods of another class**, and add or change things on top of it — instead of rewriting the same code again.",
            "The class being reused is called the parent class (or superclass, or base class). The class reusing it is called the child class (or subclass, or derived class)."
          ]
        },
        {
          type: "code",
          id: "inh-2",
          diagram: "animalDogExtends",
          diagramCaption: "Dog gets Animal's name and eat() for free, plus its own bark().",
          title: "Inheritance in Java — the `extends` keyword",
          code: "public class Animal {\n    String name;\n\n    void eat() {\n        System.out.println(name + \" is eating.\");\n    }\n}\n\npublic class Dog extends Animal {\n    void bark() {\n        System.out.println(name + \" is barking.\");\n    }\n}",
          note: "Dog extends Animal means Dog automatically gets everything Animal has (the name field and the eat() method) for free, plus its own extra behavior (bark()). Dog didn't have to redeclare name or rewrite eat()."
        },
        {
          type: "code",
          id: "inh-3",
          diagram: "dogCallsBothMethods",
          diagramCaption: "One Dog object, calling an inherited method and its own.",
          title: "Using the inherited class",
          code: "Dog myDog = new Dog();\nmyDog.name = \"Rex\";\nmyDog.eat();   // Rex is eating.   (inherited from Animal)\nmyDog.bark();  // Rex is barking.  (Dog's own method)",
          note: "A Dog object has access to both its own methods AND everything from Animal — that's the whole point of inheritance."
        },
        {
          type: "concept",
          id: "inh-4",
          important: true,
          diagram: "isARelationshipTest",
          diagramCaption: "Dog is an Animal passes the test; Engine is a Car fails it.",
          title: "The \"is-a\" relationship — how to know when to use inheritance",
          body: [
            "Inheritance should only be used when there's a genuine \"is-a\" relationship: a Dog IS AN Animal. A Car IS A Vehicle. A Manager IS AN Employee.",
            "**If you can't honestly say \"X is a Y,\" you probably shouldn't make X inherit from Y** — that's a very common interview trap (covered more in Topic 14, Composition vs Inheritance)."
          ]
        },
        {
          type: "concept",
          id: "inh-5",
          diagram: "singleInheritanceOnly",
          diagramCaption: "One parent is allowed; two parents at once is not.",
          title: "Java only allows single inheritance for classes",
          body: "A Java class can extend only ONE parent class — class Dog extends Animal is fine, but a class cannot extend two classes at once. This is different from some other languages. Java avoids this on purpose, because allowing a class to inherit from two parents creates confusing situations (like if both parents had a method with the same name — which one wins?). Java lets you achieve something similar to multiple inheritance using interfaces instead (Topic 9)."
        },
        {
          type: "code",
          id: "inh-6",
          diagram: "overrideMakeSound",
          diagramCaption: "Dog's makeSound() replaces Animal's, producing \"Woof!\".",
          title: "Overriding a method — changing inherited behavior",
          code: "public class Animal {\n    void makeSound() {\n        System.out.println(\"Some generic animal sound\");\n    }\n}\n\npublic class Dog extends Animal {\n    @Override\n    void makeSound() {\n        System.out.println(\"Woof!\");\n    }\n}\n\nDog d = new Dog();\nd.makeSound(); // Woof!  — Dog's own version replaces Animal's",
          note: "**@Override tells Java (and anyone reading the code) that this method is intentionally replacing the parent's version, not creating a new, separate one.** This is the foundation of polymorphism, covered next in Topic 7."
        },
        {
          type: "table",
          id: "inh-7",
          diagram: "inheritanceVocabIcons",
          diagramCaption: "Superclass, extends, Subclass — the vocabulary in one picture.",
          title: "Inheritance vocabulary",
          headers: ["Term", "Meaning"],
          rows: [
            ["Parent / Superclass / Base class", "the class being inherited from"],
            ["Child / Subclass / Derived class", "the class doing the inheriting"],
            ["extends", "the Java keyword used to inherit from a class"],
            ["Overriding", "a child class providing its own version of a parent's method"]
          ]
        },
        {
          type: "qa",
          id: "inh-8",
          question: "What is inheritance?",
          answer: "Inheritance lets a class (the child/subclass) automatically reuse the fields and methods of another class (the parent/superclass), using the `extends` keyword, and add or override behavior on top of it — avoiding duplicated code."
        },
        {
          type: "qa",
          id: "inh-9",
          question: "When should you use inheritance?",
          answer: "Only when there's a genuine \"is-a\" relationship between the two classes — a Dog is an Animal, a Car is a Vehicle. If the relationship is really \"has-a\" instead (a Car has an Engine), composition is usually the better choice, not inheritance."
        },
        {
          type: "qa",
          id: "inh-10",
          question: "Can a Java class extend more than one class?",
          answer: "No — Java only supports single inheritance for classes; a class can extend exactly one parent class. Java achieves something similar to multiple inheritance using interfaces, which a class can implement as many of as it wants."
        },
        {
          type: "concept",
          id: "inh-11",
          important: true,
          takeaway: true,
          diagram: "inheritanceTakeaway",
          diagramCaption: "The child stands on its parent's foundation, for free.",
          title: "Key takeaway",
          body: "Inheritance lets a child class reuse and extend a parent class's fields and methods using `extends`, avoiding duplicate code — but only use it for genuine \"is-a\" relationships, and remember Java classes can only extend one parent at a time."
        }
      ]
    },

    {
      title: "Topic 7 · Polymorphism",
      items: [
        {
          type: "concept",
          id: "poly-1",
          important: true,
          diagram: "oneCallDifferentResult",
          diagramCaption: "The same call, pointed at a Dog or a Cat, sounds different.",
          title: "What is polymorphism?",
          body: [
            "Polymorphism literally means \"many forms.\" In OOP, it means **the same method call can behave differently depending on which object it's actually called on.**",
            "You already saw a hint of this in Topic 6 — calling makeSound() produced different output for Animal vs Dog. That's polymorphism in action."
          ]
        },
        {
          type: "code",
          id: "poly-2",
          diagram: "samePetLineDifferentOutput",
          diagramCaption: "myPet reassigned from Dog to Cat — same line, new result.",
          title: "The classic polymorphism example",
          code: "public class Animal {\n    void makeSound() { System.out.println(\"Some sound\"); }\n}\npublic class Dog extends Animal {\n    @Override\n    void makeSound() { System.out.println(\"Woof!\"); }\n}\npublic class Cat extends Animal {\n    @Override\n    void makeSound() { System.out.println(\"Meow!\"); }\n}\n\n// the powerful part:\nAnimal myPet = new Dog();\nmyPet.makeSound(); // Woof!\n\nmyPet = new Cat();\nmyPet.makeSound(); // Meow!",
          note: "**The variable's declared type is Animal, but the actual object it points to decides which makeSound() runs.** The exact same line of code (myPet.makeSound()) produces different results depending on what's actually stored in myPet at that moment — that's polymorphism."
        },
        {
          type: "concept",
          id: "poly-3",
          important: true,
          diagram: "oneLoopHandlesEveryType",
          diagramCaption: "One loop, zero type-checks — every animal handles itself.",
          title: "Why is this actually useful?",
          body: "Imagine a list of Animals — some Dogs, some Cats, some Birds. Without polymorphism, you'd need to check each one's exact type and call the right method manually. With polymorphism, you can write one loop — for (Animal a : animals) { a.makeSound(); } — and each animal correctly makes its own sound automatically, with zero type-checking. This is the real payoff: **write code once, against the general type, and let each specific object handle itself correctly.**"
        },
        {
          type: "concept",
          id: "poly-4",
          diagram: "twoKindsOfPolymorphism",
          diagramCaption: "Runtime (overriding) vs compile-time (overloading).",
          title: "The two kinds of polymorphism",
          body: [
            "Runtime polymorphism (method overriding): decided while the program is running, based on the actual object type. This is the Dog/Cat/makeSound() example above — also called dynamic polymorphism.",
            "Compile-time polymorphism (method overloading): decided while the code is being compiled, based on the method signature you wrote. Same method name, different parameter lists. This is covered in full detail in Topic 8."
          ]
        },
        {
          type: "code",
          id: "poly-5",
          diagram: "shapeArrayEachOwnArea",
          diagramCaption: "A Circle and a Rectangle, each computing its own area().",
          title: "Polymorphism with an abstract type (a quick preview)",
          code: "abstract class Shape {\n    abstract double area();\n}\nclass Circle extends Shape {\n    double radius;\n    Circle(double r) { radius = r; }\n    double area() { return 3.14159 * radius * radius; }\n}\nclass Rectangle extends Shape {\n    double width, height;\n    Rectangle(double w, double h) { width = w; height = h; }\n    double area() { return width * height; }\n}\n\nShape[] shapes = { new Circle(3), new Rectangle(4, 5) };\nfor (Shape s : shapes) {\n    System.out.println(s.area()); // correct formula for each shape, automatically\n}",
          note: "Neither Circle nor Rectangle needs special handling — the loop just calls .area() on each Shape, and polymorphism makes sure the right formula runs. Abstract classes are covered fully in Topic 9."
        },
        {
          type: "qa",
          id: "poly-6",
          question: "What is polymorphism?",
          answer: "Polymorphism means the same method call behaves differently depending on the actual object it's called on. In Java this mainly happens through method overriding (a subclass provides its own version of a parent's method), so code written against the general parent type automatically runs the correct, specific behavior."
        },
        {
          type: "qa",
          id: "poly-7",
          question: "What's the practical benefit of polymorphism?",
          answer: "It lets you write code once against a general type (like Animal or Shape) and have it correctly handle every specific subtype automatically, without needing to check \"what type is this\" and branch manually. This makes code shorter, easier to extend (adding a new subtype requires no changes to the existing loop/logic), and less error-prone."
        },
        {
          type: "qa",
          id: "poly-8",
          question: "What's the difference between compile-time and runtime polymorphism?",
          answer: "Compile-time polymorphism (method overloading) is resolved by the compiler based on the method signature — which overloaded version to call is decided before the program even runs. Runtime polymorphism (method overriding) is resolved while the program is running, based on the actual type of the object, not the variable's declared type."
        },
        {
          type: "concept",
          id: "poly-9",
          important: true,
          takeaway: true,
          diagram: "polymorphismTakeaway",
          diagramCaption: "One call, correct behavior per object, automatically.",
          title: "Key takeaway",
          body: "Polymorphism means the same method call produces different behavior depending on the actual object it runs on — mainly achieved through method overriding. It lets you write one piece of code against a general type and have every specific subtype behave correctly, automatically."
        }
      ]
    },

    {
      title: "Topic 8 · Method Overloading vs Overriding",
      items: [
        {
          type: "concept",
          id: "ovld-1",
          important: true,
          diagram: "sameNameForkOverloadOverride",
          diagramCaption: "Same method name, two very different stories.",
          title: "The one-line distinction to memorize",
          body: "**Overloading = same method name, different parameters, same class, decided at compile time. Overriding = same method name, same parameters, parent/child classes, decided at runtime.** Almost every confusion about these two comes back to forgetting this line."
        },
        {
          type: "code",
          id: "ovld-2",
          diagram: "calculatorThreeDoors",
          diagramCaption: "Three add() doors, matched before the program runs.",
          title: "Method overloading — multiple versions in the same class",
          code: "public class Calculator {\n    int add(int a, int b) {\n        return a + b;\n    }\n    double add(double a, double b) {\n        return a + b;\n    }\n    int add(int a, int b, int c) {\n        return a + b + c;\n    }\n}\n\nCalculator calc = new Calculator();\ncalc.add(2, 3);        // calls the (int, int) version -> 5\ncalc.add(2.5, 3.5);    // calls the (double, double) version -> 6.0\ncalc.add(1, 2, 3);     // calls the (int, int, int) version -> 6",
          note: "Three methods, all named add, all living in the same class. Java figures out which one to run based on the number and types of arguments you pass — this decision happens **at compile time**, before the program even runs."
        },
        {
          type: "code",
          id: "ovld-3",
          diagram: "runtimeDispatchDogSound",
          diagramCaption: "The real object decides which makeSound() runs, at runtime.",
          title: "Method overriding — a child class replacing a parent's version",
          code: "class Animal {\n    void makeSound() {\n        System.out.println(\"Some sound\");\n    }\n}\nclass Dog extends Animal {\n    @Override\n    void makeSound() {\n        System.out.println(\"Woof!\");\n    }\n}",
          note: "Only ONE method here, not multiple — Dog's makeSound() has the exact same name AND the exact same parameters as Animal's, and it lives in a subclass, not the same class. It replaces the parent's version for Dog objects specifically. Which version runs is decided **at runtime**, based on the real object type."
        },
        {
          type: "table",
          id: "ovld-4",
          important: true,
          diagram: "overloadOverrideCompactCompare",
          diagramCaption: "Six rows, compressed into one shape.",
          title: "Overloading vs Overriding — the full comparison",
          headers: ["", "Overloading", "Overriding"],
          rows: [
            ["Method name", "same", "same"],
            ["Parameters", "must be different", "must be exactly the same"],
            ["Where it happens", "within the same class", "between a parent class and a child class"],
            ["Decided when", "compile time", "runtime"],
            ["Return type", "can be different", "must be the same (or a subtype of it)"],
            ["Relationship needed", "none — just multiple methods in one class", "requires inheritance"]
          ]
        },
        {
          type: "concept",
          id: "ovld-5",
          important: true,
          diagram: "overrideAccessWidening",
          diagramCaption: "Access can widen on override, never narrow.",
          title: "Rules for overriding — what you can't change",
          body: [
            "When a child class overrides a parent method, the method name and parameter list must match exactly — that's what makes it an override instead of an accidental new, unrelated method.",
            "**The access level can only stay the same or become more open, never more restrictive** — you can override a protected method with a public one, but not a public method with a private one.",
            "The @Override annotation isn't strictly required by Java, but you should always use it — it makes the compiler check that you're actually overriding something real, catching typos (like a slightly misspelled method name) instantly instead of silently creating a useless new method."
          ]
        },
        {
          type: "concept",
          id: "ovld-6",
          title: "Can you overload constructors too?",
          body: "Yes — this was already shown back in Topic 3 (constructor overloading) without naming it explicitly. Car() and Car(String color, int speed) are two overloaded constructors, same idea as overloaded regular methods: same name (the class name), different parameter lists."
        },
        {
          type: "qa",
          id: "ovld-7",
          question: "What's the difference between overloading and overriding?",
          answer: "Overloading means having multiple methods with the same name but different parameters within the same class, resolved at compile time based on the arguments passed. Overriding means a subclass providing its own implementation of a method that already exists in its parent class, with the exact same name and parameters, resolved at runtime based on the actual object type."
        },
        {
          type: "qa",
          id: "ovld-8",
          diagram: "overloadReturnTypeAlone",
          diagramCaption: "Same params, different return type — not a valid overload.",
          question: "Can you change the return type when overloading a method?",
          answer: "Yes — as long as the parameter list is different, the return type can be anything. Return type alone is not enough to overload a method though — if two methods have identical parameter lists but different return types, that's a compile error, not valid overloading."
        },
        {
          type: "qa",
          id: "ovld-9",
          diagram: "covariantReturnOverride",
          diagramCaption: "An override's return type can narrow to a subtype, never go unrelated.",
          question: "Can you change the return type when overriding a method?",
          answer: "It must stay the same, or be a subtype of the original return type (called a covariant return type). You cannot override a method and return a completely unrelated type."
        },
        {
          type: "concept",
          id: "ovld-10",
          important: true,
          takeaway: true,
          diagram: "ovldTakeaway",
          diagramCaption: "One shared name, two completely different mechanisms.",
          title: "Key takeaway",
          body: "Overloading is same name, different parameters, same class, decided at compile time. Overriding is same name, same parameters, parent-to-child relationship, decided at runtime. If you remember only that one distinction, you can answer almost any interview question about the two."
        }
      ]
    },

    {
      title: "Topic 9 · Abstract Classes vs Interfaces",
      items: [
        {
          type: "concept",
          id: "absint-1",
          important: true,
          diagram: "abstractClassCannotInstantiate",
          diagramCaption: "An abstract Shape can't be built directly — only extended.",
          title: "What is an abstract class?",
          body: [
            "An abstract class is a class that can't be instantiated directly (you can never write new Shape() if Shape is abstract) — it exists purely to be extended by other classes.",
            "It can contain a mix of abstract methods (declared but with no body — a promise that subclasses must implement) and regular methods (with a full body, shared by every subclass)."
          ]
        },
        {
          type: "code",
          id: "absint-2",
          diagram: "shapeCircleForcedImplement",
          diagramCaption: "Circle must implement area(); describe() comes for free.",
          title: "An abstract class in Java",
          code: "abstract class Shape {\n    abstract double area(); // no body — subclasses MUST implement this\n\n    void describe() {       // regular method — shared by all subclasses\n        System.out.println(\"This shape's area is \" + area());\n    }\n}\n\nclass Circle extends Shape {\n    double radius;\n    Circle(double r) { radius = r; }\n\n    @Override\n    double area() {\n        return 3.14159 * radius * radius;\n    }\n}\n\n// Shape s = new Shape();     // compile error — can't instantiate an abstract class\nCircle c = new Circle(3);\nc.describe(); // works — inherited from Shape, and it calls Circle's own area()",
          note: "Circle is forced to implement area() because it's abstract in Shape — if Circle didn't, the code wouldn't compile. describe() didn't need to be rewritten at all, since it already had a full body in Shape."
        },
        {
          type: "concept",
          id: "absint-3",
          important: true,
          diagram: "interfaceChecklistContract",
          diagramCaption: "An interface: signatures only, no bodies.",
          title: "What is an interface?",
          body: [
            "An interface is a pure contract — it defines a set of method signatures that any implementing class must provide, but (traditionally) has no implementation at all.",
            "Think of it as a checklist: \"if you claim to implement this interface, you must provide these exact methods.\""
          ]
        },
        {
          type: "code",
          id: "absint-4",
          diagram: "payableEmployeeImplements",
          diagramCaption: "Employee implements Payable and delivers calculatePay().",
          title: "An interface in Java",
          code: "interface Payable {\n    double calculatePay(); // no body\n}\n\nclass Employee implements Payable {\n    double hoursWorked, hourlyRate;\n\n    Employee(double h, double r) { hoursWorked = h; hourlyRate = r; }\n\n    @Override\n    public double calculatePay() {\n        return hoursWorked * hourlyRate;\n    }\n}",
          note: "Employee implements Payable, meaning it PROMISES to provide a calculatePay() method — and it does. Any class implementing Payable can be trusted to have a working calculatePay(), no matter how differently each one calculates it internally."
        },
        {
          type: "concept",
          id: "absint-5",
          important: true,
          diagram: "duckMultipleInterfacesFanIn",
          diagramCaption: "One Duck, many interfaces fanning in.",
          title: "A class can implement MANY interfaces — this is how Java fakes multiple inheritance",
          body: "Remember from Topic 6 that a Java class can only extend one parent class. But a class can implement as many interfaces as it wants: class Duck implements Flyable, Swimmable { ... } — this is exactly how Java gives you most of the benefits of multiple inheritance without the confusing conflicts a real multiple-class-inheritance system would cause."
        },
        {
          type: "table",
          id: "absint-6",
          important: true,
          diagram: "abstractInterfaceCompactCompare",
          diagramCaption: "Five rows, compressed into one shape.",
          title: "Abstract class vs Interface — the real comparison",
          headers: ["", "Abstract Class", "Interface"],
          rows: [
            ["Keyword", "abstract class ... extends", "interface ... implements"],
            ["Can have method bodies?", "yes, mix of abstract and regular methods", "traditionally no (modern Java allows default methods, but keep it simple: think \"no body\")"],
            ["Can have fields?", "yes, any kind (including private, with state)", "only public static final constants"],
            ["How many can a class use?", "only one (single inheritance)", "as many as you want"],
            ["When to use it", "when subclasses share common code/state, and are closely related (\"is-a\")", "when unrelated classes just need to guarantee they can all do the same thing (\"can-do\")"]
          ]
        },
        {
          type: "concept",
          id: "absint-7",
          diagram: "decisionFlowChooseTool",
          diagramCaption: "Share real code? Abstract class. Guarantee a capability? Interface.",
          title: "How to choose between them — the practical interview answer",
          body: "Ask: do these classes share actual code and state, and are they naturally the same kind of thing? Use an abstract class (Circle and Rectangle are both fundamentally Shapes, sharing describe()). Do these classes just need to guarantee they can perform an action, even though they're otherwise unrelated? Use an interface (a Bird and an Airplane are nothing alike, but both can implement Flyable)."
        },
        {
          type: "qa",
          id: "absint-8",
          question: "What's the difference between an abstract class and an interface?",
          answer: "An abstract class can have both abstract and fully-implemented methods plus any kind of fields, and a class can only extend one abstract class. An interface traditionally only declares method signatures with no implementation, and a class can implement as many interfaces as it wants. Use an abstract class for closely related types that share real code; use an interface when unrelated classes just need to guarantee the same capability."
        },
        {
          type: "qa",
          id: "absint-9",
          question: "Can you create an object of an abstract class directly?",
          answer: "No — new Shape() on an abstract Shape class is a compile error. You can only create objects of concrete (non-abstract) subclasses that implement all the abstract methods."
        },
        {
          type: "qa",
          id: "absint-10",
          diagram: "whyManyInterfacesOneClassConflict",
          diagramCaption: "Two classes conflict; two interfaces never do.",
          question: "Why does Java let a class implement multiple interfaces but extend only one class?",
          answer: "Extending multiple classes could create ambiguous conflicts if two parent classes had their own different implementations of the same method — Java has no rule for which one should win. Interfaces (traditionally) don't have implementations to conflict with, only method signatures, so implementing several at once is safe and unambiguous."
        },
        {
          type: "concept",
          id: "absint-11",
          important: true,
          takeaway: true,
          diagram: "absIntTakeaway",
          diagramCaption: "Two tools, one shared goal: abstraction.",
          title: "Key takeaway",
          body: "An abstract class is a partially-built base class for closely related subclasses to extend (single inheritance, can share real code). An interface is a pure contract of method signatures that unrelated classes can all promise to fulfill (a class can implement many). Both are tools for achieving abstraction."
        }
      ]
    },

    {
      title: "Topic 10 · Access Modifiers",
      items: [
        {
          type: "concept",
          id: "acc-1",
          diagram: "gatekeeperIntro",
          diagramCaption: "Access modifiers decide who's allowed in.",
          title: "What are access modifiers?",
          body: "Access modifiers control which other classes are allowed to see or use a field, method, or class. They're one of the main tools Java gives you to actually enforce encapsulation — without them, private fields wouldn't be possible at all."
        },
        {
          type: "table",
          id: "acc-2",
          important: true,
          diagram: "fourLevelsNestedBoxes",
          diagramCaption: "Private is innermost, public wraps around everything.",
          title: "The four access levels in Java",
          headers: ["Modifier", "Who can access it"],
          rows: [
            ["private", "only code inside the exact same class"],
            ["default (no keyword written)", "only code inside the same package"],
            ["protected", "same package, PLUS subclasses in other packages"],
            ["public", "any code, anywhere, no restrictions"]
          ],
          note: "They go from most restrictive (private) to least restrictive (public): private < default < protected < public."
        },
        {
          type: "code",
          id: "acc-3",
          diagram: "bankAccountThreeOpenness",
          diagramCaption: "One class, three different doors on its fields.",
          title: "Access modifiers in action",
          code: "public class BankAccount {\n    private double balance;       // only BankAccount itself can touch this\n    protected String accountType; // this class + subclasses can touch this\n    public String ownerName;      // anyone can touch this\n\n    public double getBalance() {  // public method exposing controlled access\n        return balance;\n    }\n}",
          note: "This is encapsulation (Topic 4) actually being enforced by the language — private isn't just a convention, Java's compiler will refuse to compile code outside BankAccount that tries to write acc.balance directly."
        },
        {
          type: "concept",
          id: "acc-4",
          important: true,
          diagram: "leastPrivilegeDefaultLocked",
          diagramCaption: "Default to private, widen only the field that needs it.",
          title: "Why not just make everything public?",
          body: "Because that removes every safety guarantee encapsulation gives you — any code anywhere could set balance to an invalid value, and you'd have no way to stop it. **The general rule: make fields as restrictive as possible (usually private), and only open them up (via public methods) when something outside genuinely needs access.** This is sometimes called the principle of least privilege."
        },
        {
          type: "qa",
          id: "acc-5",
          question: "What are the four access modifiers in Java, from most to least restrictive?",
          answer: "private (same class only) → default/package-private (same package) → protected (same package plus subclasses elsewhere) → public (accessible from anywhere)."
        },
        {
          type: "qa",
          id: "acc-6",
          question: "Why should fields usually be private?",
          answer: "To enforce encapsulation — a private field can only be changed through the class's own methods, which can validate the change and keep the object in a consistent, valid state. Making fields public removes that protection entirely."
        },
        {
          type: "concept",
          id: "acc-7",
          important: true,
          takeaway: true,
          diagram: "accessTakeaway",
          diagramCaption: "Default to private, widen only when needed.",
          title: "Key takeaway",
          body: "Access modifiers (private, default, protected, public) control who can see or use a class's fields and methods. They're the actual language mechanism that makes encapsulation enforceable — default to private, and only widen access when something genuinely needs it."
        }
      ]
    },

    {
      title: "Topic 11 · The static keyword",
      items: [
        {
          type: "concept",
          id: "stat-1",
          important: true,
          title: "What does static mean?",
          body: [
            "A static field or method **belongs to the class itself, not to any individual object.** There's only ever one copy, shared by every object of that class — not a separate copy per object like normal (instance) fields.",
            "Compare: every Car object has its own color (instance field). But if you wanted to track \"how many Car objects have been created total,\" that count belongs to the Car class as a whole, not to any one car — that's what static is for."
          ]
        },
        {
          type: "code",
          id: "stat-2",
          title: "A static field — shared across every object",
          code: "public class Car {\n    String color;             // instance field — each Car has its own\n    static int totalCars = 0; // static field — shared by ALL Car objects\n\n    public Car(String c) {\n        color = c;\n        totalCars++; // every new car increases the SAME shared counter\n    }\n}\n\nnew Car(\"red\");\nnew Car(\"blue\");\nnew Car(\"green\");\nSystem.out.println(Car.totalCars); // 3",
          note: "Notice Car.totalCars is accessed through the CLASS name, not through an object — that's the giveaway that something is static. All three Car objects share the exact same totalCars variable; incrementing it in one constructor call affects the value everyone sees."
        },
        {
          type: "code",
          id: "stat-3",
          title: "A static method",
          code: "public class MathHelper {\n    static int square(int n) {\n        return n * n;\n    }\n}\n\nint result = MathHelper.square(5); // 25 — no object created at all!",
          note: "You never wrote new MathHelper() — static methods can be called directly on the class, because they don't need any object's data to run. Math.random() and Math.max() in Java's standard library are real examples you've probably already used."
        },
        {
          type: "concept",
          id: "stat-4",
          important: true,
          title: "The rule that trips people up: static code can't use instance data",
          body: "**A static method cannot directly access instance (non-static) fields or call instance (non-static) methods** — because static code runs at the class level, before any specific object necessarily exists, so there's no particular object's data for it to use. If MathHelper.square() tried to read a non-static field, it would be a compile error — Java would ask \"which object's field do you mean?\" and there's no answer."
        },
        {
          type: "table",
          id: "stat-5",
          title: "static vs instance — the core comparison",
          headers: ["Instance (normal)", "static"],
          rows: [
            ["Belongs to a specific object", "Belongs to the class itself"],
            ["One separate copy per object", "One single shared copy"],
            ["Accessed via objectName.field", "Accessed via ClassName.field"],
            ["Can access static members? yes", "Can be accessed from static code? no, not directly"]
          ]
        },
        {
          type: "qa",
          id: "stat-6",
          question: "What does the static keyword mean in Java?",
          answer: "static means a field or method belongs to the class itself rather than to any individual object — there's one single shared copy, accessed through the class name, rather than a separate copy per instance."
        },
        {
          type: "qa",
          id: "stat-7",
          question: "Why can't a static method use instance fields directly?",
          answer: "Because a static method can be called without any object existing at all (e.g. MathHelper.square(5) never creates a MathHelper object), so there's no specific object's instance field for it to reference — Java has no way to know whose field you mean."
        },
        {
          type: "concept",
          id: "stat-8",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: "static means \"belongs to the class, not to any one object\" — there's a single shared copy, accessed via the class name. Instance members belong to individual objects instead, with a separate copy per object. Static code can't directly touch instance members, since no specific object is guaranteed to exist."
        }
      ]
    },

    {
      title: "Topic 12 · this & super",
      items: [
        {
          type: "concept",
          id: "thsup-1",
          important: true,
          title: "The `this` keyword — referring to the current object",
          body: "`this` refers to the specific object whose method or constructor is currently running. You already saw its most common use in Topic 3: when a constructor parameter has the same name as a field, this.fieldName distinguishes \"the object's field\" from \"the parameter.\""
        },
        {
          type: "code",
          id: "thsup-2",
          title: "`this` to disambiguate, and `this()` to call another constructor",
          code: "public class Car {\n    String color;\n    int speed;\n\n    public Car(String color, int speed) {\n        this.color = color; // this.color = the field, color = the parameter\n        this.speed = speed;\n    }\n\n    public Car(String color) {\n        this(color, 0); // calls the other constructor above, with speed=0\n    }\n}",
          note: "this(color, 0) is one constructor calling another constructor of the SAME class — a handy way to avoid repeating setup logic across multiple overloaded constructors. It must be the very first line if used."
        },
        {
          type: "concept",
          id: "thsup-3",
          important: true,
          title: "The `super` keyword — referring to the parent class",
          body: "`super` refers to the parent class, from inside a child class. It's used two main ways: super.methodName() to call the parent's version of a method you've overridden, and super(...) to call the parent's constructor."
        },
        {
          type: "code",
          id: "thsup-4",
          title: "super() calling the parent's constructor",
          code: "class Animal {\n    String name;\n    Animal(String name) {\n        this.name = name;\n        System.out.println(\"Animal constructor ran\");\n    }\n}\n\nclass Dog extends Animal {\n    Dog(String name) {\n        super(name); // calls Animal's constructor first\n        System.out.println(\"Dog constructor ran\");\n    }\n}\n\nnew Dog(\"Rex\");\n// prints:\n// Animal constructor ran\n// Dog constructor ran",
          note: "**Every constructor's very first action is always to run some version of the parent's constructor** — if you don't write super(...) yourself, Java secretly inserts a call to the parent's no-argument constructor for you. This guarantees the parent part of the object is always fully set up before the child's own setup runs."
        },
        {
          type: "code",
          id: "thsup-5",
          title: "super.method() calling the parent's version of an overridden method",
          code: "class Animal {\n    void makeSound() {\n        System.out.println(\"Some generic sound\");\n    }\n}\nclass Dog extends Animal {\n    @Override\n    void makeSound() {\n        super.makeSound(); // still runs Animal's version first\n        System.out.println(\"...and also Woof!\");\n    }\n}\n\nnew Dog().makeSound();\n// Some generic sound\n// ...and also Woof!",
          note: "Without super.makeSound(), overriding would completely replace the parent's behavior. With it, Dog can build on top of what Animal already does instead of throwing it away entirely."
        },
        {
          type: "table",
          id: "thsup-6",
          title: "this vs super, side by side",
          headers: ["this", "super"],
          rows: [
            ["Refers to the current object", "Refers to the parent class"],
            ["this() calls another constructor in the SAME class", "super() calls a constructor in the PARENT class"],
            ["Common use: disambiguate field vs parameter", "Common use: call the parent's overridden method"]
          ]
        },
        {
          type: "qa",
          id: "thsup-7",
          question: "What does `this` refer to?",
          answer: "The current object — the specific instance whose method or constructor is currently executing. It's most commonly used to distinguish a field from a same-named constructor/method parameter."
        },
        {
          type: "qa",
          id: "thsup-8",
          question: "What does `super` refer to, and what are its two main uses?",
          answer: "super refers to the parent class from inside a child class. Its two main uses are: super(...) to explicitly call the parent's constructor, and super.methodName() to call the parent's version of a method the child has overridden."
        },
        {
          type: "qa",
          id: "thsup-9",
          question: "If you don't write super(...) in a constructor, what happens?",
          answer: "Java automatically inserts a call to the parent's no-argument constructor as the very first line, before anything else in your constructor runs. If the parent class doesn't have a no-argument constructor available, this becomes a compile error, and you must call super(...) explicitly with the right arguments."
        },
        {
          type: "concept",
          id: "thsup-10",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: "`this` refers to the current object (often used to tell a field apart from a same-named parameter). `super` refers to the parent class (used to call the parent's constructor or its overridden method version). Every constructor implicitly or explicitly calls a parent constructor first."
        }
      ]
    },

    {
      title: "Topic 13 · Object class basics — toString, equals, hashCode",
      items: [
        {
          type: "concept",
          id: "objcls-1",
          important: true,
          title: "Every class in Java secretly extends Object",
          body: "Even if you never write extends anywhere, every single class in Java automatically inherits from a built-in class called Object — it's the root of the entire class hierarchy. That means every object you ever create already has a few methods available for free, including toString(), equals(), and hashCode()."
        },
        {
          type: "code",
          id: "objcls-2",
          title: "toString() — what gets printed",
          code: "public class Car {\n    String color;\n    Car(String c) { color = c; }\n}\n\nCar myCar = new Car(\"red\");\nSystem.out.println(myCar); // Car@1b6d3586  (ugly, meaningless memory address)",
          note: "That default output comes from Object's default toString() — it just prints the class name plus a memory-related hash code, which is rarely useful."
        },
        {
          type: "code",
          id: "objcls-3",
          title: "Overriding toString() to make it meaningful",
          code: "public class Car {\n    String color;\n    Car(String c) { color = c; }\n\n    @Override\n    public String toString() {\n        return \"Car(color=\" + color + \")\";\n    }\n}\n\nSystem.out.println(myCar); // Car(color=red)",
          note: "**Overriding toString() is one of the most common, practical overrides you'll write** — anytime you print an object or convert it to text (like in debugging or logging), your version runs instead of the default."
        },
        {
          type: "concept",
          id: "objcls-4",
          important: true,
          title: "equals() — what \"equal\" even means for objects",
          body: [
            "By default, == and the inherited equals() both check if two variables point to the exact same object in memory — not whether they \"look\" the same.",
            "Car a = new Car(\"red\"); Car b = new Car(\"red\"); a.equals(b) returns **false** by default, even though both cars are red — because they're two separate objects in memory, and Object's default equals() only checks identity, not content."
          ]
        },
        {
          type: "code",
          id: "objcls-5",
          title: "Overriding equals() to compare content instead of identity",
          code: "public class Car {\n    String color;\n    Car(String c) { color = c; }\n\n    @Override\n    public boolean equals(Object other) {\n        if (this == other) return true;\n        if (!(other instanceof Car)) return false;\n        Car otherCar = (Car) other;\n        return this.color.equals(otherCar.color);\n    }\n}\n\nCar a = new Car(\"red\");\nCar b = new Car(\"red\");\nSystem.out.println(a.equals(b)); // true — now it compares color, not identity",
          note: "Now equals() answers \"do these two cars have the same color\" instead of \"are these the literal same object in memory.\" This is exactly what you want when comparing things like two Strings, or two objects representing the same real-world entity."
        },
        {
          type: "concept",
          id: "objcls-6",
          important: true,
          title: "hashCode() — why it comes paired with equals()",
          body: "**The rule Java expects you to follow: if two objects are equal() to each other, they MUST return the same hashCode().** This matters because collections like HashMap and HashSet use hashCode() to quickly find which \"bucket\" an object belongs in, then use equals() to confirm an exact match within that bucket. If you override equals() without also overriding hashCode() to match, two \"equal\" objects could end up looking different to a HashSet — breaking it in confusing ways. Most IDEs can generate a correct equals()/hashCode() pair for you automatically."
        },
        {
          type: "qa",
          id: "objcls-7",
          question: "Why does printing an object with System.out.println() show something like Car@1b6d3586 by default?",
          answer: "Because that's the default toString() inherited from Java's built-in Object class, which every class extends automatically — it just prints the class name and a hash-based identifier. Overriding toString() lets you return a meaningful, readable description instead."
        },
        {
          type: "qa",
          id: "objcls-8",
          question: "Why does a.equals(b) return false for two objects with identical field values, if you haven't overridden equals()?",
          answer: "The default equals() inherited from Object only checks whether two references point to the exact same object in memory (the same thing == checks) — not whether their contents look the same. You have to override equals() yourself to compare field values instead of memory identity."
        },
        {
          type: "qa",
          id: "objcls-9",
          question: "Why should equals() and hashCode() always be overridden together?",
          answer: "Java's contract requires that two objects considered equal() must return the same hashCode(). Hash-based collections like HashMap and HashSet rely on this to work correctly — if you override only equals(), \"equal\" objects could get different hash codes and the collection would fail to recognize them as duplicates."
        },
        {
          type: "concept",
          id: "objcls-10",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: "Every class inherits toString(), equals(), and hashCode() from Java's built-in Object class, but their default behavior is rarely useful (raw memory info, identity-only comparison). Override toString() for meaningful output, and always override equals() and hashCode() together for content-based comparison."
        }
      ]
    },

    {
      title: "Topic 14 · Composition vs Inheritance",
      items: [
        {
          type: "concept",
          id: "comp-1",
          title: "Two ways to build relationships between classes",
          body: "So far, Topic 6 covered inheritance (\"is-a\") as one way to reuse code across classes. There's a second, equally important way: composition — building a class out of other objects it contains, rather than extending them."
        },
        {
          type: "code",
          id: "comp-2",
          title: "Composition — a \"has-a\" relationship",
          code: "class Engine {\n    void start() {\n        System.out.println(\"Engine starting...\");\n    }\n}\n\nclass Car {\n    private Engine engine; // Car HAS AN Engine — composition\n\n    Car() {\n        engine = new Engine();\n    }\n\n    void start() {\n        engine.start(); // Car delegates to its Engine\n        System.out.println(\"Car is ready to drive\");\n    }\n}",
          note: "Car does NOT extend Engine — a car isn't a type of engine, that relationship would make no sense (\"is-a\" fails the test from Topic 6). Instead, Car simply holds/contains an Engine object as one of its fields, and uses it. This is composition."
        },
        {
          type: "table",
          id: "comp-3",
          important: true,
          title: "is-a vs has-a — the test that decides which to use",
          headers: ["Question", "Relationship", "Tool"],
          rows: [
            ["Is a Dog an Animal?", "yes — is-a", "inheritance (Dog extends Animal)"],
            ["Does a Car have an Engine?", "yes — has-a", "composition (Car contains an Engine field)"],
            ["Is a Car an Engine?", "no — fails is-a", "would be wrong to use inheritance here"]
          ]
        },
        {
          type: "concept",
          id: "comp-4",
          important: true,
          title: "\"Favor composition over inheritance\" — a famous piece of advice",
          body: [
            "This is a well-known OOP design principle, and it comes up a lot in interviews: **when you're unsure, lean toward composition rather than inheritance.**",
            "Why: inheritance creates a very tight, rigid coupling — a child class is deeply bound to everything about its parent's implementation, and changing the parent can unexpectedly break every child. Composition is more flexible — you can swap out the contained object (a different Engine, like an ElectricEngine) without restructuring the whole class hierarchy."
          ]
        },
        {
          type: "code",
          id: "comp-5",
          title: "Why composition is more flexible — swapping parts",
          code: "class ElectricEngine extends Engine {\n    @Override\n    void start() {\n        System.out.println(\"Silent electric start...\");\n    }\n}\n\nclass Car {\n    private Engine engine;\n    Car(Engine e) { engine = e; } // any kind of Engine can be plugged in\n\n    void start() { engine.start(); }\n}\n\nCar gasCar = new Car(new Engine());\nCar electricCar = new Car(new ElectricEngine());",
          note: "Car's own code never changes, no matter what kind of Engine gets plugged into it — this flexibility (being able to swap the Engine implementation freely) is exactly what \"favor composition\" is pointing at, and it also happens to be an example of polymorphism at work."
        },
        {
          type: "qa",
          id: "comp-6",
          question: "What's the difference between composition and inheritance?",
          answer: "Inheritance (is-a) means a class extends another class and directly reuses/replaces its behavior — a Dog is an Animal. Composition (has-a) means a class contains another class as a field and delegates to it — a Car has an Engine. Composition is generally more flexible because the contained object can be swapped out easily."
        },
        {
          type: "qa",
          id: "comp-7",
          question: "Why do many experienced developers say \"favor composition over inheritance\"?",
          answer: "Because inheritance creates tight coupling between parent and child — changes to the parent class can unexpectedly break subclasses, and the relationship is fixed at compile time. Composition is more flexible: you can change or swap out the contained object at runtime, and it doesn't force an artificial \"is-a\" relationship where a \"has-a\" one would be more accurate."
        },
        {
          type: "concept",
          id: "comp-8",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: "Inheritance models \"is-a\" relationships by extending a class; composition models \"has-a\" relationships by containing another object as a field. When both seem possible, composition is usually the safer, more flexible choice — reserve inheritance for genuine is-a relationships."
        }
      ]
    },

    {
      title: "Topic 15 · SOLID Principles",
      items: [
        {
          type: "concept",
          id: "solid-1",
          title: "What is SOLID?",
          body: "SOLID is a set of five design principles that help you write OOP code that's easier to maintain, extend, and understand. It's an acronym — each letter stands for one principle. You don't need to be an expert in all five, but interviewers love asking \"what does the S in SOLID stand for\" type questions, so knowing the names and the basic idea behind each one goes a long way."
        },
        {
          type: "concept",
          id: "solid-2",
          important: true,
          title: "S — Single Responsibility Principle",
          body: [
            "**A class should have only one reason to change** — meaning it should do just one job.",
            "Bad: a single Employee class that calculates pay AND saves data to a database AND prints reports — three unrelated responsibilities crammed into one class. If the database logic changes, you risk breaking the pay calculation too. Better: split it into Employee (data), PayCalculator (calculates pay), and EmployeeRepository (saves/loads data) — each with one job."
          ]
        },
        {
          type: "concept",
          id: "solid-3",
          important: true,
          title: "O — Open/Closed Principle",
          body: [
            "**Classes should be open for extension, but closed for modification** — you should be able to add new behavior without changing existing, already-working code.",
            "Example: instead of one calculateArea() method with a giant if/else checking \"is this a Circle? is this a Rectangle?\" (which you'd have to edit every time a new shape is added), use the Shape/abstract-class pattern from Topic 9 — adding a new shape means writing a new class, not editing old, tested code."
          ]
        },
        {
          type: "concept",
          id: "solid-4",
          important: true,
          title: "L — Liskov Substitution Principle",
          body: [
            "**A subclass should be usable anywhere its parent class is expected, without breaking anything.** If code works correctly with an Animal, it should keep working correctly if you hand it a Dog instead.",
            "The classic broken example: a Square class that extends Rectangle, but overrides setWidth() to also change the height (to stay a square) — this breaks any code that expected \"setting a Rectangle's width shouldn't affect its height.\" The subclass technically compiles, but violates what the parent promised, which is exactly what this principle warns against."
          ]
        },
        {
          type: "concept",
          id: "solid-5",
          important: true,
          title: "I — Interface Segregation Principle",
          body: [
            "**Don't force a class to implement methods it doesn't actually need** — many small, specific interfaces are better than one giant, general-purpose interface.",
            "Bad: one big Worker interface with work() and eat() — now a Robot class implementing Worker is forced to implement eat(), which makes no sense for a robot. Better: split into separate Workable and Eatable interfaces, and let Robot implement only Workable."
          ]
        },
        {
          type: "concept",
          id: "solid-6",
          important: true,
          title: "D — Dependency Inversion Principle",
          body: [
            "**Depend on abstractions (interfaces), not on concrete, specific classes** — high-level code shouldn't be tightly locked to one specific low-level implementation.",
            "Example: a Car class that depends on the Engine interface (not a specific GasEngine class directly) can work with any Engine implementation — GasEngine, ElectricEngine, anything — without Car's own code ever changing. This is the same idea from Topic 14's composition example, formalized as a principle."
          ]
        },
        {
          type: "table",
          id: "solid-7",
          title: "SOLID at a glance",
          headers: ["Letter", "Stands for", "One-line idea"],
          rows: [
            ["S", "Single Responsibility", "one class, one job"],
            ["O", "Open/Closed", "extend behavior without editing existing code"],
            ["L", "Liskov Substitution", "a subclass must behave safely wherever its parent is expected"],
            ["I", "Interface Segregation", "many small interfaces, not one giant one"],
            ["D", "Dependency Inversion", "depend on interfaces, not specific concrete classes"]
          ]
        },
        {
          type: "qa",
          id: "solid-8",
          question: "What does SOLID stand for?",
          answer: "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion — five principles for writing maintainable, flexible object-oriented code."
        },
        {
          type: "qa",
          id: "solid-9",
          question: "What is the Single Responsibility Principle, in simple terms?",
          answer: "A class should have only one job, and only one reason to ever need to change. If a class is doing multiple unrelated things, it should be split into multiple classes, each responsible for one thing."
        },
        {
          type: "qa",
          id: "solid-10",
          question: "What does the Liskov Substitution Principle actually protect against?",
          answer: "It protects against subclasses that technically compile but secretly break the behavior their parent class promised — meaning code written to work with the parent type can silently misbehave if handed a subclass instance instead. A subclass should always be safely substitutable for its parent."
        },
        {
          type: "concept",
          id: "solid-11",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: "SOLID is five principles for maintainable OOP design: Single Responsibility (one job per class), Open/Closed (extend without modifying), Liskov Substitution (subclasses must behave safely as their parent), Interface Segregation (small focused interfaces), and Dependency Inversion (depend on abstractions, not concrete classes)."
        }
      ]
    }
  ]
};
