


const listTopic = [
    {title: "Environment1", description: "This lesson we will discussion about environment, pollution and global warnming", img: "/environment.png"},
    {title: "Environment2", description: "This lesson we will discussion about environment, pollution and global warnming", img: "/environment.png"},
    {title: "Environment3", description: "This lesson we will discussion about environment, pollution and global warnming", img: "/environment.png"},
    {title: "Environment4", description: "This lesson we will discussion about environment, pollution and global warnming", img: "/environment.png"},
    {title: "Environment5", description: "This lesson we will discussion about environment, pollution and global warnming", img: "/environment.png"},
    {title: "Environment6", description: "This lesson we will discussion about environment, pollution and global warnming", img: "/environment.png"},
    {title: "Environment7", description: "This lesson we will discussion about environment, pollution and global warnming", img: "/environment.png"},
    {title: "Environment8", description: "This lesson we will discussion about environment, pollution and global warnming", img: "/environment.png"},
    {title: "Environment9", description: "This lesson we will discussion about environment, pollution and global warnming", img: "/environment.png"}
];

const ListTest = [
    {title: "Mixed Test 2023", duration:"60 minutes", questions: "20", score:"80"},
    {title: "Mixed Test 2023", duration:"60 minutes", questions: "20", score:"80"},
    {title: "Mixed Test 2023", duration:"60 minutes", questions: "20", score:"80"},
    {title: "Mixed Test 2023", duration:"60 minutes", questions: "20", score:"80"},
    {title: "Mixed Test 2023", duration:"60 minutes", questions: "20", score:"80"},
    {title: "Mixed Test 2023", duration:"60 minutes", questions: "20", score:"80"},
    {title: "Mixed Test 2023", duration:"60 minutes", questions: "20", score:"80"},

  ];

const site = [
    {
        id: 1,
        title: "Vocabulary",
        bg: "/bg_vocabulary.png",
        path: "list-topic",
        quote: "Expand your knowledge and enhance your skills through our diverse vocabulary topics. Explore and learn with us!",
        list: listTopic,
        file: "ListTopic"
    
    },
    {
        id: 2,
        title: "Grammar",
        bg: "/bg_grammar.png",
        path: "grammar",
        quote: "Master the rules of grammar to express yourself with confidence and clarity. Learn the building blocks of language with ease!",
        list: listTopic,
        file: "ListTopic"
        
   
    },
    {
        id: 3,
        title: "Reading",
        bg: "/bg_reading.png",
        path: "skill/reading",
        quote: "Enhance your comprehension and analytical skills by exploring various texts. Uncover the power of reading and deepen your understanding!",
        list: listTopic,
        file: "ListTopic"
  
    },
    {
        id: 4,
        title: "Listening",
        bg: "/bg_listening.png",
        path: "skill/listening",
        quote: "Sharpen your listening skills and tune in to real-life conversations. Improve your ability to understand spoken language effectively!",
        list: listTopic,
        file: "ListTopic"

    },
    {
        id: 5,
        title: "Speaking",
        bg: "/bg_speaking.png",
        path: "skill/speaking",
        quote: "Speak with confidence and fluency in any situation. Practice your speaking skills and become a natural communicator!",
        list: listTopic,
        file: "ListTopic"
    
    },
    {
        id: 6,
        title: "Writing",
        bg: "/bg_writing.png",
        path: "skill/writing",
        quote: "Enhance your writing abilities to express your ideas clearly and effectively. Write with precision and creativity across various styles!",
        list: listTopic,
        file: "ListTopic"
    },
    {
        id: 7,
        title: "Test Online",
        bg: "/bg_test.png",
        path: "test",
        quote: "",
        list: ListTest,
        file: "ListTest"
    },
    {
        id: 8,
        title: "Test Online",
        bg: "/bg_test.png",
        path: "test/skilltest",
        quote: "",
        list: ListTest,
        file: "ListTest_Skill"
    },
    {
        id: 9,
        title: "Test Online",
        bg: "/bg_test.png",
        path: "test/skilltest/reading",
        quote: "",
        list: ListTest,
        file: "TestReading"
    },
    {
        id: 10,
        title: "Test Online",
        bg: "/bg_test.png",
        path: "test/skilltest/listening",
        quote: "",
        list: ListTest,
        file: "TestListening"
    }
    ,
    {
        id: 11,
        title: "Test Online",
        bg: "/bg_test.png",
        path: "test/skilltest/writing",
        quote: "",
        list: ListTest,
        file: "TestWriting"
    }
    ,
    {
        id: 12,
        title: "Test Online",
        bg: "/bg_test.png",
        path: "test/skilltest/speaking",
        quote: "",
        list: ListTest,
        file: "TestSpeaking"
    }
]

export default site;