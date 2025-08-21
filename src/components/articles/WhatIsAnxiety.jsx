import { Link } from 'react-router-dom';

export default function WhatIsAnxiety() {
  const sectionStyle = { marginBottom: '1.5rem' };
  return (
    <div>
      <Link to="/library">&larr; Back to Library</Link>
      <article>
        <h1>Understanding Anxiety</h1>
        <p><em>This article is for informational purposes only and is not a substitute for professional medical advice.</em></p>

        <div style={sectionStyle}>
          <h2>What is Anxiety?</h2>
          <p>Anxiety is a natural human response to stress. It's a feeling of fear or apprehension about what's to come. The first day of school, going to a job interview, or giving a speech may cause most people to feel fearful and nervous. But if your feelings of anxiety are extreme, last for longer than six months, and are interfering with your life, you may have an anxiety disorder.</p>
          
          <p>From an evolutionary perspective, anxiety served as a protective mechanism, helping our ancestors survive by alerting them to potential dangers. This "fight-or-flight" response triggers the release of stress hormones like adrenaline and cortisol, preparing the body to either confront or escape from perceived threats.</p>
          
          <p>In modern times, while we face fewer physical threats, our anxiety response can be triggered by psychological stressors such as work pressure, financial concerns, relationship issues, or health worries. When this response becomes chronic or disproportionate to the actual threat, it can develop into an anxiety disorder.</p>
        </div>

        <div style={sectionStyle}>
          <h2>Types of Anxiety Disorders</h2>
          <p>Anxiety disorders encompass several specific conditions, each with unique characteristics:</p>
          <ul>
            <li><strong>Generalized Anxiety Disorder (GAD):</strong> Persistent and excessive worry about various aspects of life, often without a specific trigger</li>
            <li><strong>Panic Disorder:</strong> Recurring panic attacks with intense fear and physical symptoms that peak within minutes</li>
            <li><strong>Social Anxiety Disorder:</strong> Intense fear of social situations and being judged or scrutinized by others</li>
            <li><strong>Specific Phobias:</strong> Excessive fear of specific objects or situations (heights, spiders, flying, etc.)</li>
            <li><strong>Agoraphobia:</strong> Fear of being in situations where escape might be difficult or help unavailable</li>
            <li><strong>Separation Anxiety Disorder:</strong> Excessive fear of being separated from attachment figures</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2>Common Symptoms</h2>
          <p>Anxiety manifests through various physical, emotional, and behavioral symptoms:</p>
          
          <h3>Physical Symptoms:</h3>
          <ul>
            <li>Increased heart rate or palpitations</li>
            <li>Breathing rapidly (hyperventilation) or shortness of breath</li>
            <li>Sweating or trembling</li>
            <li>Muscle tension or headaches</li>
            <li>Fatigue or feeling weak</li>
            <li>Digestive issues (nausea, stomach upset)</li>
            <li>Dizziness or lightheadedness</li>
            <li>Sleep disturbances</li>
          </ul>
          
          <h3>Emotional and Cognitive Symptoms:</h3>
          <ul>
            <li>Feeling nervous, restless, or tense</li>
            <li>Having a sense of impending danger, panic, or doom</li>
            <li>Racing thoughts or difficulty concentrating</li>
            <li>Irritability or mood swings</li>
            <li>Persistent worry or overthinking</li>
            <li>Feeling overwhelmed or out of control</li>
          </ul>
          
          <h3>Behavioral Symptoms:</h3>
          <ul>
            <li>Avoidance of anxiety-triggering situations</li>
            <li>Seeking frequent reassurance from others</li>
            <li>Procrastination or difficulty making decisions</li>
            <li>Compulsive behaviors or rituals</li>
            <li>Social withdrawal or isolation</li>
          </ul>
        </div>
        
        <div style={sectionStyle}>
          <h2>Causes and Risk Factors</h2>
          <p>The development of anxiety disorders is complex and typically involves a combination of factors:</p>
          
          <h3>Biological Factors:</h3>
          <ul>
            <li><strong>Genetics:</strong> Family history of anxiety or other mental health disorders</li>
            <li><strong>Brain Chemistry:</strong> Imbalances in neurotransmitters like serotonin, dopamine, and GABA</li>
            <li><strong>Medical Conditions:</strong> Heart disease, diabetes, thyroid problems, or chronic pain</li>
            <li><strong>Substance Use:</strong> Alcohol, caffeine, or drug use can trigger or worsen anxiety</li>
          </ul>
          
          <h3>Environmental Factors:</h3>
          <ul>
            <li><strong>Trauma:</strong> Physical or emotional abuse, neglect, or witnessing violence</li>
            <li><strong>Stress:</strong> Major life changes, work pressure, or financial difficulties</li>
            <li><strong>Childhood Experiences:</strong> Overprotective parenting or early loss of a parent</li>
            <li><strong>Social Environment:</strong> Bullying, social isolation, or cultural factors</li>
          </ul>
          
          <h3>Psychological Factors:</h3>
          <ul>
            <li><strong>Personality Traits:</strong> Perfectionism, low self-esteem, or need for control</li>
            <li><strong>Thinking Patterns:</strong> Catastrophic thinking or tendency to overestimate threats</li>
            <li><strong>Coping Skills:</strong> Poor stress management or problem-solving abilities</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2>Treatment Options</h2>
          <p>Anxiety disorders are highly treatable, and most people benefit from professional treatment. Common approaches include:</p>
          
          <h3>Therapy:</h3>
          <ul>
            <li><strong>Cognitive Behavioral Therapy (CBT):</strong> Helps identify and change negative thought patterns and behaviors</li>
            <li><strong>Exposure Therapy:</strong> Gradual exposure to feared situations to reduce avoidance</li>
            <li><strong>Acceptance and Commitment Therapy (ACT):</strong> Focuses on accepting anxiety while pursuing meaningful activities</li>
            <li><strong>Mindfulness-Based Therapies:</strong> Incorporates meditation and mindfulness practices</li>
          </ul>
          
          <h3>Medication:</h3>
          <ul>
            <li><strong>Antidepressants:</strong> SSRIs and SNRIs are often first-line treatments</li>
            <li><strong>Anti-anxiety medications:</strong> Benzodiazepines for short-term relief (used cautiously due to dependency risk)</li>
            <li><strong>Beta-blockers:</strong> For physical symptoms like rapid heartbeat</li>
            <li><strong>Buspirone:</strong> An anti-anxiety medication for long-term use</li>
          </ul>
          
          <h3>Lifestyle Changes:</h3>
          <ul>
            <li>Regular exercise and physical activity</li>
            <li>Healthy sleep habits and adequate rest</li>
            <li>Stress management techniques</li>
            <li>Limiting caffeine and alcohol</li>
            <li>Maintaining social connections</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2>Coping Strategies and Self-Help</h2>
          <p>While professional treatment is important, there are many self-help strategies that can complement therapy:</p>
          
          <h3>Immediate Coping Techniques:</h3>
          <ul>
            <li><strong>Deep Breathing:</strong> Practice diaphragmatic breathing to activate the relaxation response</li>
            <li><strong>Grounding Techniques:</strong> Use the 5-4-3-2-1 method (5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste)</li>
            <li><strong>Progressive Muscle Relaxation:</strong> Systematically tense and relax muscle groups</li>
            <li><strong>Mindfulness:</strong> Focus on the present moment without judgment</li>
          </ul>
          
          <h3>Long-term Strategies:</h3>
          <ul>
            <li><strong>Regular Exercise:</strong> Aim for at least 30 minutes of moderate activity most days</li>
            <li><strong>Healthy Diet:</strong> Limit caffeine, sugar, and processed foods; eat regular, balanced meals</li>
            <li><strong>Sleep Hygiene:</strong> Maintain consistent sleep schedule and create a relaxing bedtime routine</li>
            <li><strong>Stress Management:</strong> Practice time management, set realistic goals, and learn to say no</li>
            <li><strong>Support Network:</strong> Build and maintain relationships with family and friends</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2>Impact on Daily Life</h2>
          <p>Anxiety disorders can significantly affect various aspects of life:</p>
          
          <h3>Work and School:</h3>
          <ul>
            <li>Difficulty concentrating or making decisions</li>
            <li>Decreased productivity and performance</li>
            <li>Absenteeism or avoiding important meetings/presentations</li>
            <li>Procrastination and missed deadlines</li>
          </ul>
          
          <h3>Relationships:</h3>
          <ul>
            <li>Social withdrawal and isolation</li>
            <li>Difficulty forming or maintaining relationships</li>
            <li>Increased dependence on others for reassurance</li>
            <li>Communication challenges</li>
          </ul>
          
          <h3>Physical Health:</h3>
          <ul>
            <li>Chronic stress leading to physical health problems</li>
            <li>Weakened immune system</li>
            <li>Digestive issues and sleep disorders</li>
            <li>Increased risk of cardiovascular problems</li>
          </ul>
        </div>
        
        <div style={sectionStyle}>
          <h2>Common Myths and Misconceptions</h2>
          <p>There are many misconceptions about anxiety that can prevent people from seeking help. Let's address some of the most common myths:</p>
          
          <h3>Myth 1: "Anxiety is just stress - it's not a real medical condition"</h3>
          <p><strong>Reality:</strong> Anxiety disorders are legitimate medical conditions recognized by the American Psychiatric Association. They involve changes in brain chemistry and structure that can be measured and treated.</p>
          
          <h3>Myth 2: "People with anxiety are just weak or seeking attention"</h3>
          <p><strong>Reality:</strong> Anxiety disorders are not a sign of weakness or character flaw. They can affect anyone regardless of age, gender, background, or personality. Many successful and strong individuals struggle with anxiety.</p>
          
          <h3>Myth 3: "If you can function day-to-day, you don't have 'real' anxiety"</h3>
          <p><strong>Reality:</strong> Many people with anxiety disorders are high-functioning and can maintain their daily responsibilities while struggling internally. This is called "high-functioning anxiety" and is still a valid condition requiring attention.</p>
          
          <h3>Myth 4: "Anxiety medication will change your personality"</h3>
          <p><strong>Reality:</strong> When properly prescribed and monitored, anxiety medications help restore normal brain chemistry rather than alter personality. They can help you feel more like yourself by reducing overwhelming symptoms.</p>
          
          <h3>Myth 5: "You should be able to overcome anxiety through willpower alone"</h3>
          <p><strong>Reality:</strong> While coping strategies and lifestyle changes are important, anxiety disorders often require professional treatment. It's not about willpower - it's about getting the right tools and support.</p>
        </div>

        <div style={sectionStyle}>
          <h2>Anxiety in Different Life Stages</h2>
          
          <h3>Children and Adolescents:</h3>
          <ul>
            <li>Separation anxiety when starting school or being away from parents</li>
            <li>Social anxiety about fitting in with peers</li>
            <li>Performance anxiety about grades and extracurricular activities</li>
            <li>Body image and identity-related anxieties during puberty</li>
            <li>Fear of failure or not meeting expectations</li>
          </ul>
          
          <h3>Young Adults:</h3>
          <ul>
            <li>College and career transition anxiety</li>
            <li>Financial independence and responsibility stress</li>
            <li>Relationship and dating anxieties</li>
            <li>Decision-making about life direction</li>
            <li>Social media and comparison-related anxiety</li>
          </ul>
          
          <h3>Middle-Aged Adults:</h3>
          <ul>
            <li>Work-life balance and career pressure</li>
            <li>Parenting responsibilities and concerns</li>
            <li>Health anxiety and aging concerns</li>
            <li>Financial security and retirement planning</li>
            <li>Caring for aging parents</li>
          </ul>
          
          <h3>Older Adults:</h3>
          <ul>
            <li>Health-related anxiety and medical procedures</li>
            <li>Loss of independence or mobility</li>
            <li>Grief and loss of loved ones</li>
            <li>Financial concerns on fixed income</li>
            <li>Isolation and loneliness</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2>The Science Behind Anxiety</h2>
          <p>Understanding the biological basis of anxiety can help reduce stigma and promote self-compassion:</p>
          
          <h3>Brain Regions Involved:</h3>
          <ul>
            <li><strong>Amygdala:</strong> The brain's "alarm system" that detects threats and triggers fear responses</li>
            <li><strong>Prefrontal Cortex:</strong> Responsible for rational thinking and decision-making; can be overwhelmed during anxiety</li>
            <li><strong>Hippocampus:</strong> Involved in memory formation and retrieval of past experiences</li>
            <li><strong>Hypothalamus:</strong> Controls the stress response and hormone release</li>
          </ul>
          
          <h3>Neurotransmitters:</h3>
          <ul>
            <li><strong>Serotonin:</strong> Often called the "happiness chemical," low levels are associated with anxiety and depression</li>
            <li><strong>GABA:</strong> The brain's primary inhibitory neurotransmitter that promotes calm and relaxation</li>
            <li><strong>Dopamine:</strong> Associated with reward and motivation; imbalances can contribute to anxiety</li>
            <li><strong>Norepinephrine:</strong> Involved in the stress response and fight-or-flight reaction</li>
          </ul>
          
          <h3>The Stress Response System:</h3>
          <p>When the brain perceives a threat (real or imagined), it activates the hypothalamic-pituitary-adrenal (HPA) axis, releasing stress hormones like cortisol and adrenaline. In anxiety disorders, this system becomes hyperactive or fails to shut off properly after the threat passes.</p>
        </div>

        <div style={sectionStyle}>
          <h2>Building Resilience and Prevention</h2>
          <p>While some risk factors for anxiety can't be changed, there are ways to build resilience and reduce the likelihood of developing anxiety disorders:</p>
          
          <h3>Early Intervention:</h3>
          <ul>
            <li>Teaching children healthy coping strategies</li>
            <li>Creating supportive and predictable environments</li>
            <li>Addressing bullying and social difficulties promptly</li>
            <li>Promoting emotional literacy and communication skills</li>
          </ul>
          
          <h3>Lifestyle Factors:</h3>
          <ul>
            <li><strong>Regular Physical Activity:</strong> Exercise naturally reduces stress hormones and releases endorphins</li>
            <li><strong>Balanced Nutrition:</strong> Stable blood sugar levels and adequate nutrients support mental health</li>
            <li><strong>Quality Sleep:</strong> Poor sleep increases vulnerability to anxiety and stress</li>
            <li><strong>Social Connections:</strong> Strong relationships provide support and reduce isolation</li>
            <li><strong>Mindfulness Practices:</strong> Regular meditation or mindfulness exercises build emotional regulation skills</li>
          </ul>
          
          <h3>Stress Management Skills:</h3>
          <ul>
            <li>Time management and organizational skills</li>
            <li>Problem-solving and decision-making abilities</li>
            <li>Healthy boundary setting</li>
            <li>Realistic goal setting and expectation management</li>
            <li>Regular relaxation and self-care practices</li>
          </ul>
        </div>
        
        <div style={sectionStyle}>
          <h2>When to Seek Help</h2>
          <p>It's important to seek help if you feel like you are worrying too much and it's interfering with your work, relationships or other parts of your life. Talking to a peer can help, but consulting with a mental health professional is a crucial step towards diagnosis and treatment.</p>
          
          <h3>Specific Signs to Watch For:</h3>
          <ul>
            <li>Anxiety symptoms persist for more than six months</li>
            <li>Symptoms interfere with daily activities, work, or relationships</li>
            <li>You're avoiding situations you previously enjoyed</li>
            <li>Physical symptoms are affecting your health</li>
            <li>You're using alcohol or drugs to cope with anxiety</li>
            <li>You're having thoughts of self-harm</li>
          </ul>
          
          <h3>Types of Professionals Who Can Help:</h3>
          <ul>
            <li><strong>Primary Care Physician:</strong> Can assess symptoms and provide initial treatment or referrals</li>
            <li><strong>Psychologist:</strong> Provides therapy and psychological testing</li>
            <li><strong>Psychiatrist:</strong> Medical doctor who can prescribe medication and provide therapy</li>
            <li><strong>Licensed Clinical Social Worker:</strong> Provides therapy and connects you with community resources</li>
            <li><strong>Licensed Professional Counselor:</strong> Provides various types of therapy</li>
          </ul>
          
          <h3>How to Find Help:</h3>
          <ul>
            <li>Ask your primary care doctor for a referral</li>
            <li>Contact your insurance company for covered providers</li>
            <li>Use online therapist directories and matching services</li>
            <li>Contact local mental health organizations</li>
            <li>Check with your employer's Employee Assistance Program (EAP)</li>
            <li>Consider teletherapy options for increased accessibility</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2>Crisis Resources</h2>
          <p>If you're experiencing a mental health crisis or having thoughts of self-harm, immediate help is available:</p>
          
          <h3>Emergency Contacts:</h3>
          <ul>
            <li><strong>National Suicide Prevention Lifeline:</strong> 988 (24/7 support)</li>
            <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
            <li><strong>National Alliance on Mental Illness (NAMI) Helpline:</strong> 1-800-950-NAMI (6264)</li>
            <li><strong>Emergency Services:</strong> Call 911 for immediate medical attention</li>
          </ul>
          
          <h3>Online Resources:</h3>
          <ul>
            <li>Anxiety and Depression Association of America (ADAA)</li>
            <li>National Institute of Mental Health (NIMH)</li>
            <li>Mental Health America</li>
            <li>Crisis Text Line website</li>
          </ul>
        </div>
      </article>
    </div>
  );
}