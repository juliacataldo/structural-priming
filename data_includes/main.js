PennController.ResetPrefix(null); // Shorten command names (keep this line here))

function SepWithN(sep, main, n) {
    this.args = [sep,main];

    this.run = function(arrays) {
        assert(arrays.length == 2, "Wrong number of arguments (or bad argument) to SepWithN");
        assert(parseInt(n) > 0, "N must be a positive number");
        let sep = arrays[0];
        let main = arrays[1];

        if (main.length <= 1)
            return main;
            
        else {
            let newArray = [];
            while (main.length){
                for (let i = 0; i < n && main.length>0; i++)
                    newArray.push(main.shift());
                for (let j = 0; j < sep.length; ++j)
                    newArray.push(sep[j]);
            }
            return newArray;
        }
    };
}
function sepWithN(sep, main, n) { return new SepWithN(sep, main, n); }

Sequence( "consent", "prolificid", "validation", 
            "instructions" , 
            "example1", "example1explanation", "example2", "example2explanation", 
            "example3", "example3explanation", "example4", "example4explanation", 
            sepWithN("beginTest", randomize("practice"), 10),
            sepWithN("break", randomize("test"), 140) , "send" , "final" )

            
Header( /* void */ )
    // This .log command will apply to all trials
    .log( "ID" , GetURLParameter("id") ) // Append the "ID" URL parameter to each result line

//Consent
newTrial("consent"
    ,
    defaultText
        .print()
    ,
    newText("Welcome!").color('white')
    ,
    newText("<p>Informed Consent Form for Adult Participants Earning Money via Online Platforms \
    IRB-FY2024-8720</p>").color('white')
    ,
    newText("You have been invited to take part in a research study to learn more about language processing in the \
    brain. This study will be conducted by Dr. Liina Pylkkänen, FAS - Psychology, Arts & Science, New York \
    University. If you agree to be in this study, you will be asked to do the following:").color('white')
    ,
    newText("<p> • Provide basic demographic information about your age, gender, country of birth, country of \
    residence, and linguistic background.</p>").color('white')
    ,
    newText("<p> • Complete a linguistic task in which you are presented with three written expressions and your \
    task is to indicate whether the third expression is exactly the same as either of the previous ones.</p>").color('white')
    ,
    newText("<p>Participation in this study will take 40-50 minutes. Taking part in this study is \
    voluntary. You may refuse to participate or withdraw at any time without penalty. There are no known risks \
    associated with your participation in this research beyond those of everyday life. Although you will receive \
    no direct benefits for participation in this study, it may make you more aware of how knowledge is discovered\
    in psychology and help the investigator better understand how people process words, phrases, and sentences.\
    </p>").color('white')
    ,
    newText("<p>All data collected will be retained indefinitely, though no identifying information will be \
    collected or retained. All data will be accessible only to Dr. Liina Pylkkänen and her research associates.\
    Information not containing identifiers may be used in future research or shared with other researchers \
    without your additional consent.</p>").color('white')
    ,
    newText("<p>If there is anything about the study or taking part in it that is unclear or that you do not \
    understand, or if you have questions or wish to report a research-related problem, you may contact \
    the principal investigator, Dr. Liina Pylkkänen at +1-212-998-8764, liina.pylkkanen@nyu.edu, 10 Washington\
    Place Room 605, New York, NY, 10003.</p>").color('white')
    ,
    newText("<p>For questions about your rights as a research participant, you may contact the University \
    Committee on Activities Involving Human Subjects (UCAIHS), New York University, +1-212-998-4808\
    or ask.humansubjects@nyu.edu, 665 Broadway, Suite 804, New York, NY 10012.</p>").color('white')
    ,
    newText("<p>Click the button below to consent and begin the experiment.</p>").color('white')
    ,
    newButton("I consent to take part in this study")

        .center()
        .print()
        .wait()
)

// Prolific ID
newTrial( "prolificid" ,
    defaultText.center().print()
    ,
    newText("Please enter your Prolific ID:").color('white')
    ,
    newTextInput("inputprolificid")
    .center()
    .print()
    ,
    newButton("Confirm")
    .print()
    .center()
    .wait()
    ,
    newVar("prolificid")
    .global()
    .set( getTextInput("inputprolificid") )
)
.log("prolificid", getVar("prolificid") )

// Validation
newTrial( "validation" ,
    defaultText.center().print()
    ,
    newText("To avoid auto-generated answers, please write the first three words that come to mind \
    when you see the word <strong>cat</strong>.").color('white')
    ,
    newTextInput("inputvalq")
    .center()
    .print()
    ,
    newButton("Send")
    .print()
    .center()
    .wait()
    ,
    newVar("valq")
    .global()
    .set( getTextInput("inputvalq") )
)
.log("valq", getVar("valq") )

// Instructions
newTrial( "instructions" ,
    // We will print all Text elements, horizontally centered
    defaultText.center().print()
    ,
    newText("This is a matching task between three strings of words. They will be presented very quickly one after the other.").color("white")
    ,
    newText("The last string is sometimes identical to one of the prior strings. When it repeats a prior string, please say YES. When it doesn't repeat a prior string, please say NO. The differences will be small - just one word - so please pay careful attention. ").color("white")
    ,
    newText("Press ‘1’ for NO, and ‘2’ for YES.").color("white")
    ,
    newText("1: NO - not identical").color("white")
    ,
    newText("2: YES - identical").color("white")
    ,
    newText("Please use your left middle finger to press ‘1’ and your left index finger to press ‘2’.").color("white")
    ,
    newImage("hand1.png")
    .print()
    ,
    newText("The experiment will take approximately 40-50 minutes in total, divided in 6 blocks. You will be able to take breaks between each block.").color("white")
    ,
    newText("When you are ready, press SPACE to continue and see how an experimental trial will look like. You don't need to answer yet.").color("white")
    ,
    newKey(" ").wait()  // Finish trial upon press on spacebar
)

// EXAMPLE 1

newTrial("example1" ,
    // Text element at the top of the page to signal this is a practice trial
    newText("Example Trial")
        .color("white")
        .print("center at 50vw","top at 1em")
    ,
    // Display all future Text elements centered on the page, and log their display time code
    defaultText
        .center()
        .print("center at 50vw","middle at 50vh")
    ,
    // Automatically start and wait for Timer elements when created
    defaultTimer
        .start()
        .wait()
    ,
    // Fixation cross, shown on screen for 200ms
    newText("cross","+")
        .color('white')
    ,
    newTimer("crossTimer", 200),                       
    getText("cross").remove()
    ,
    // Mask1, shown on screen for 200ms
    newText("mask1"," "),
    newTimer("mask1Timer", 200),                       
    getText("mask1").remove()    
    ,
    // Prime, shown on screen for 300ms
    newText("prime","the basket was broken")
        .color('white')
        .css('font-family', 'monospace')
        .settings.css("font-size", '0.7em')
    ,
    newTimer("primeTimer", 300),
    getText("prime").remove()
    ,
    // Mask2, shown on screen for 600ms
    newText("mask2"," "),
    newTimer("mask2Timer", 600),                       
    getText("mask2").remove()    
    ,    
    // Target, shown on screen for 300ms
    newText("target","this laptop is old")
        .color('white')
        .css('font-family', 'monospace')
        .settings.css("font-size", '0.7em')
    ,
    newTimer("targetTimer", 300),
    getText("target").remove()
    ,
    // Mask3, shown on screen for 600ms
    newText("mask3"," "),
    newTimer("mask3Timer", 600),                       
    getText("mask3").remove()    
    ,    
    // Task, shown on screen for 300ms
    newText("task","this laptop is old")
        .color('white')
        .css('font-family', 'monospace')
        .settings.css("font-size", '0.7em')
    ,
    newTimer("taskTimer", 300),
    getText("task").remove()
    ,
    // Mask shown on screen until 1 or 2 is pressed
    newText("mask4"," "),
    newTimer("mask4Timer", 600),                       
    getText("mask4").remove()    
)

newTrial( "example1explanation" ,
    // We will print all Text elements, horizontally centered
    defaultText.center().print()
    ,
    newText("You saw three written expressions. Your taks is to signal if the third one is identical to any of the previous ones.").color("white")
    ,
    newText("In this case, the third expression was identical to the second one, so you would press 2 for SAME.").color("white")
    ,
    newText("When you are ready, press SPACE to see another example.").color("white")
    ,
    newKey(" ").wait()  // Finish trial upon press on spacebar
)


// EXAMPLE 2

newTrial("example2" ,
    // Text element at the top of the page to signal this is a practice trial
    newText("Example trial")
        .color("white")
        .print("center at 50vw","top at 1em")
    ,
    // Display all future Text elements centered on the page, and log their display time code
    defaultText
        .center()
        .print("center at 50vw","middle at 50vh")
    ,
    // Automatically start and wait for Timer elements when created
    defaultTimer
        .start()
        .wait()
    ,
    // Fixation cross, shown on screen for 200ms
    newText("cross","+")
        .color('white')
    ,
    newTimer("crossTimer", 200),                       
    getText("cross").remove()
    ,
    // Mask1, shown on screen for 200ms
    newText("mask1"," "),
    newTimer("mask1Timer", 200),                       
    getText("mask1").remove()    
    ,
    // Prime, shown on screen for 300ms
    newText("prime","instructor the like we")
        .color('white')
        .css('font-family', 'monospace')
        .settings.css("font-size", '0.7em')
    ,
    newTimer("primeTimer", 300),
    getText("prime").remove()
    ,
    // Mask2, shown on screen for 600ms
    newText("mask2"," "),
    newTimer("mask2Timer", 600),                       
    getText("mask2").remove()    
    ,    
    // Target, shown on screen for 300ms
    newText("target","huge were news the")
        .color('white')
        .css('font-family', 'monospace')
        .settings.css("font-size", '0.7em')
    ,
    newTimer("targetTimer", 300),
    getText("target").remove()
    ,
    // Mask3, shown on screen for 600ms
    newText("mask3"," "),
    newTimer("mask3Timer", 600),                       
    getText("mask3").remove()    
    ,    
    // Task, shown on screen for 300ms
    newText("task","instructor the like we")
        .color('white')
        .css('font-family', 'monospace')
        .settings.css("font-size", '0.7em')
    ,
    newTimer("taskTimer", 300),
    getText("task").remove()
    ,
    // Mask shown on screen until 1 or 2 is pressed
    newText("mask4"," "),
    newTimer("mask4Timer", 600),                       
    getText("mask4").remove()    
)

newTrial( "example2explanation" ,
    // We will print all Text elements, horizontally centered
    defaultText.center().print()
    ,
    newText("In this example, the third expression was the same as the first one, so you would press 2 for SAME.").color("white")
    ,
    newText("When you are ready, press SPACE to see another example.").color("white")
    ,
    newKey(" ").wait()  // Finish trial upon press on spacebar
)


// EXAMPLE 3
newTrial("example3" ,
    // Text element at the top of the page to signal this is a practice trial
    newText("Example trial")
        .color("white")
        .print("center at 50vw","top at 1em")
    ,
    // Display all future Text elements centered on the page, and log their display time code
    defaultText
        .center()
        .print("center at 50vw","middle at 50vh")
    ,
    // Automatically start and wait for Timer elements when created
    defaultTimer
        .start()
        .wait()
    ,
    // Fixation cross, shown on screen for 200ms
    newText("cross","+")
        .color('white')
    ,
    newTimer("crossTimer", 200),                       
    getText("cross").remove()
    ,
    // Mask1, shown on screen for 200ms
    newText("mask1"," "),
    newTimer("mask1Timer", 200),                       
    getText("mask1").remove()    
    ,
    // Prime, shown on screen for 300ms
    newText("prime","those nice old ladies")
        .color('white')
        .css('font-family', 'monospace')
        .settings.css("font-size", '0.7em')
    ,
    newTimer("primeTimer", 300),
    getText("prime").remove()
    ,
    // Mask2, shown on screen for 600ms
    newText("mask2"," "),
    newTimer("mask2Timer", 600),                       
    getText("mask2").remove()    
    ,    
    // Target, shown on screen for 300ms
    newText("target","those nice old ladies")
        .color('white')
        .css('font-family', 'monospace')
        .settings.css("font-size", '0.7em')
    ,
    newTimer("targetTimer", 300),
    getText("target").remove()
    ,
    // Mask3, shown on screen for 600ms
    newText("mask3"," "),
    newTimer("mask3Timer", 600),                       
    getText("mask3").remove()    
    ,    
    // Task, shown on screen for 300ms
    newText("task","those nice old ladies")
        .color('white')
        .css('font-family', 'monospace')
        .settings.css("font-size", '0.7em')
    ,
    newTimer("taskTimer", 300),
    getText("task").remove()
    ,
    // Mask shown on screen until 1 or 2 is pressed
    newText("mask4"," "),
    newTimer("mask4Timer", 600),                       
    getText("mask4").remove()    
)

newTrial( "example3explanation" ,
    // We will print all Text elements, horizontally centered
    defaultText.center().print()
    ,
    newText("In this example, the third expression was the same as both the first and second ones, so you would press 2 for SAME.").color("white")
    ,
    newText("When you are ready, press SPACE to see another example.").color("white")
    ,
    newKey(" ").wait()  // Finish trial upon press on spacebar
)


// EXAMPLE 4

newTrial("example4" ,
    // Text element at the top of the page to signal this is a practice trial
    newText("Example trial")
        .color("white")
        .print("center at 50vw","top at 1em")
    ,
    // Display all future Text elements centered on the page, and log their display time code
    defaultText
        .center()
        .print("center at 50vw","middle at 50vh")
    ,
    // Automatically start and wait for Timer elements when created
    defaultTimer
        .start()
        .wait()
    ,
    // Fixation cross, shown on screen for 200ms
    newText("cross","+")
        .color('white')
    ,
    newTimer("crossTimer", 200),                       
    getText("cross").remove()
    ,
    // Mask1, shown on screen for 200ms
    newText("mask1"," "),
    newTimer("mask1Timer", 200),                       
    getText("mask1").remove()    
    ,
    // Prime, shown on screen for 300ms
    newText("prime","buy some different shoes")
        .color('white')
        .css('font-family', 'monospace')
        .settings.css("font-size", '0.7em')
    ,
    newTimer("primeTimer", 300),
    getText("prime").remove()
    ,
    // Mask2, shown on screen for 600ms
    newText("mask2"," "),
    newTimer("mask2Timer", 600),                       
    getText("mask2").remove()    
    ,    
    // Target, shown on screen for 300ms
    newText("target","start playing the game")
        .color('white')
        .css('font-family', 'monospace')
        .settings.css("font-size", '0.7em')
    ,
    newTimer("targetTimer", 300),
    getText("target").remove()
    ,
    // Mask3, shown on screen for 600ms
    newText("mask3"," "),
    newTimer("mask3Timer", 600),                       
    getText("mask3").remove()    
    ,    
    // Task, shown on screen for 300ms
    newText("task","buy some different clothes")
        .color('white')
        .css('font-family', 'monospace')
        .settings.css("font-size", '0.7em')
    ,
    newTimer("taskTimer", 300),
    getText("task").remove()
    ,
    // Mask shown on screen until 1 or 2 is pressed
    newText("mask4"," "),
    newTimer("mask4Timer", 600),                       
    getText("mask4").remove()    
)

newTrial( "example4explanation" ,
    // We will print all Text elements, horizontally centered
    defaultText.center().print()
    ,
    newText("In this example, the third expression was NOT identical to any of the prior ones, so you would press 1 for NO").color("white")
    ,
    newText("Now let's do a few practice trials. Thus, you should start completing the task.").color("white")
    ,
    newText("Remember, press ‘1’ with your LEFT MIDDLE FINGER  for NO - the third string of words is NOT identical to any of the prior ones.").color("white")
    ,
    newText("and press ‘2’ with your LEFT INDEX FINGER for YES - the third string of words is INDEED identical to either the first or second ones.").color("white")
    ,
    newImage("hand1.png")
        .print()
    ,
    newText("During this practice, you will receive feedback."). color("white")
    ,
    newText("Answer as quickly and accurately as possible.").color("white")
    ,
    newText("When you are ready, press SPACE to do a practice run.").color("white")
    ,
    newKey(" ").wait()  // Finish trial upon press on spacebar
)


// PRACTICE

Template("practice_stimuli.csv" ,
    row => newTrial( "practice" ,   
        // Display all Text elements centered on the page, and log their display time code
        defaultText
            .center()
            .print("center at 50vw","middle at 50vh")
            .log()
        ,
        // Automatically start and wait for Timer elements when created, and log those events
        defaultTimer
            .log()
            .start()
            .wait()
        ,
        // Fixation cross, shown on screen for 200ms
        newText("cross","+")
            .color('white')
            .settings.css("font-size", '0.7em')
        ,
        newTimer("crossTimer", 200),                       
        getText("cross").remove()
        ,
        //Mask1, shown on screen for 200ms
        newText("mask1"," "),
        newTimer("mask1Timer", 200),                       
        getText("mask1").remove()    
        ,
        // Prime, shown on screen for 300ms
        newText("prime",row.prime)
            .color('white')
            .css('font-family', 'monospace')
            .settings.css("font-size", '0.7em')
        ,
        newTimer("primeTimer", 300),
        getText("prime").remove()
        ,
        // Mask2, shown on screen for 600ms
        newText("mask2"," "),
        newTimer("mask2Timer", 600),                       
        getText("mask2").remove()    
        ,    
        // Target, shown on screen for 300ms
        newText("target",row.target)
            .color('white')
            .css('font-family', 'monospace')
            .settings.css("font-size", '0.7em')
        ,
        newTimer("targetTimer", 300),
        getText("target").remove()
        ,
        // Mask3, shown on screen for 600ms
        newText("mask3"," ")
        ,
        newTimer("mask4Timer", 600),                       
        getText("mask4").remove() 
        ,        
        // Task, shown on screen for 300ms
        newText("task",row.task)
            .color('white')
            .css('font-family', 'monospace')
            .settings.css("font-size", '0.7em')
        ,
        newTimer("taskTimer", 300),
        getText("task").remove()
        ,
        // Mask4, shown on screen until 1 or 2 is pressed
        newText("mask4","  ")
        ,    
        newKey("answerPractice", "12")
            .wait()                 // Only proceed after a keypress on 1 or 2
            .test.pressed(row.correct_answer)      // Set the "guide" Tooltip element's feedback text accordingly
            .success( 
                newText("correct", "Correct")
                .color("white")
                .css("text-align","center")
                .settings.css("font-size", '0.7em')
                .print("center at 50vw","center at 50vh"),
                newTimer("  ", 600)
                //.wait()
                //getTooltip("guide").text("<p>No, the second word was <em>read</em>.</p> You should have pressed H.") 
                ,
                getText("correct").remove() // End of trial, move to next one
                )
            .failure( 
                newText("incorrect", "Wrong")
                .color("white")
                .css("text-align","center")
                .settings.css("font-size", '0.7em')
                .print("center at 50vw","center at 50vh"),
                newTimer(" ", 500)
                ,
                getText("incorrect").remove() // End of trial, move to next one
                )
        ,
        getText("mask4")
            .remove() // End of trial, move to next one
        , 
        newText("jitter", " "),
        newTimer("jitterTimer", 700),
        getText("jitter").remove()
        
    .log( "set", row.set)
    .log( "comp", row.comp)
    .log( "prime", row.prime )
    .log( "target", row.target )
    .log( "task", row.task)
    .log( "matchmanip", row.matchmanip)
    .log( "match_1", row.match_1)
    .log( "match_2", row.match_2)
    .log( "mismatch_s1_w1", row.mismatch_s1_w1)
    .log( "mismatch_s2_w1", row.mismatch_s2_w1)
    .log( "mismatch_s1_w2", row.mismatch_s1_w2)
    .log( "mismatch_s2_w2", row.mismatch_s2_w2)
    .log( "mismatch_s1_w3", row.mismatch_s1_w3)
    .log( "mismatch_s2_w3", row.mismatch_s2_w3)
    .log( "mismatch_s1_w4", row.mismatch_s1_w4)
    .log( "mismatch_s2_w4", row.mismatch_s2_w4)
    .log( "correct_answer", row.correct_answer)
))


// TEST 
newTrial( "beginTest" ,
    // We will print all Text elements, horizontally centered
    defaultText.center().print()
    ,
    newText("We are now ready to start the experiment.").color('white')
    ,
    newText("You will see the same types of trials in the actual experiment, but will receive no feedback.").color('white')
    ,
    newText("There will be 6 blocks of tasks. Each block takes approximately \
    7 minutes, after which you can take a short break. \
    In total, the experiment takes 45-50 minutes.").color("white")
    ,
    newText("REMEMBER:")
        .color('white')
        .bold()
    ,
    newText("Remember, press ‘1’ with your LEFT MIDDLE FINGER  for NO - the third string of words is NOT identical to any of the prior ones.").color("white")
    ,
    newText("and press ‘2’ with your LEFT INDEX FINGER for YES - the third string of words is INDEED identical to either the first or second ones.").color("white")
    ,
    newImage("hand1.png")
        .print()
    ,
    newText("Press SPACE when you are ready to begin the experiment.").color("white")
    ,
    newKey(" ").wait()  // Finish trial upon press on spacebar
)

Template( "stimuli.csv" , 
    row => newTrial( "test" ,   
        // Display all Text elements centered on the page, and log their display time code
        defaultText
            .center()
            .print("center at 50vw","middle at 50vh")
            .log()
        ,
        // Automatically start and wait for Timer elements when created, and log those events
        defaultTimer
            .log()
            .start()
            .wait()
        ,
        // Fixation cross, shown on screen for 200ms
        newText("cross","+")
            .color('white')
            .settings.css("font-size", '0.7em')
        ,
        newTimer("crossTimer", 200),                       
        getText("cross").remove()
        ,
        // Mask1, shown on screen for 200ms
        newText("mask1","  "),
        newTimer("mask1Timer", 200),                       
        getText("mask1").remove()
        ,
        // Prime, shown on screen for 300ms
        newText("prime",row.prime)
            .color('white')
            .css('font-family', 'monospace')
            .settings.css("font-size", '0.7em')
        ,
        newTimer("primeTimer", 300),
        getText("prime").remove()
        ,
        // Mask2, shown on screen for 600ms
        newText("mask2","  "),
        newTimer("mask2Timer", 600),                       
        getText("mask2").remove()
        ,        
        // Target, shown on screen for 300ms
        newText("target",row.target)
            .color('white')
            .css('font-family', 'monospace')
            .settings.css("font-size", '0.7em')
        ,
        newTimer("targetTimer", 300),
        getText("target").remove()
        ,
        // Mask3, shown on screen for 600ms
        newText("mask3","  "),
        newTimer("mask3Timer", 600),                       
        getText("mask3").remove()
        ,        
        // Task, shown on screen for 300ms
        newText("task",row.task)
            .color('white')
            .css('font-family', 'monospace')
            .settings.css("font-size", '0.7em')
        ,
        newTimer("taskTimer", 300),
        getText("task").remove()
        ,
        // Mask, shown on screen until answer is selected
        newText("mask4","  ")
        ,
        newKey("answerTest", "12")
            .log()
            .wait()   // Proceed upon press on 1 or 2 (log it)
        ,
        getText("mask4")
            .remove() // End of trial, move to next one
        , 
        newText("jitter", " "),
        newTimer("jitterTimer", row.jitter),
        getText("jitter").remove()
        
    .log( "set", row.set)
    .log( "cond_tag", row.cond_tag)
    .log( "comp", row.comp)
    .log( "struc", row.struc)
    .log( "words", row.words)
    .log( "frame", row.frame)
    .log( "prime", row.prime )
    .log( "target", row.target )
    .log( "task",row.task)
    .log( "matchmanip",row.matchmanip)
    .log( "match_1", row.match_1)
    .log( "match_2", row.match_2)
    .log( "mismatch_s1_w1", row.mismatch_s1_w1)
    .log( "mismatch_s2_w1", row.mismatch_s2_w1)
    .log( "mismatch_s1_w2", row.mismatch_s1_w2)
    .log( "mismatch_s2_w2", row.mismatch_s2_w2)
    .log( "mismatch_s1_w3", row.mismatch_s1_w3)
    .log( "mismatch_s2_w3", row.mismatch_s2_w3)
    .log( "mismatch_s1_w4", row.mismatch_s1_w4)
    .log( "mismatch_s2_w4", row.mismatch_s2_w4)
    .log( "jitter")
    .log( "correct_answer", row.correct_answer)
))

// Break
newTrial("break", 

    newVar("block_n", 0).global().set(v=>v+1) , 
    newVar("text").set(getVar("block_n")).set(v=>"You have now completed block "+v+" of 6.") , 
    newText("prompt", "").text(getVar("text")).color('white').print() , 
    newButton("Continue").print().center().wait() 
)


// Send the results
SendResults("send")

// A simple final screen
newTrial ( "final" ,
    newText("The experiment is now over. Thank you for your time!")
        .color('white')
        .print()
    ,
    newText("<p><a href='https://app.prolific.com/submissions/complete?cc=C13QA3NW' target='_blank'>Please click this link to confirm your participation and return to Prolific.</a></p>")
        .color('white')
        .print()
    ,

    // Stay on this page forever
    newButton().wait()
)