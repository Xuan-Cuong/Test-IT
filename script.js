document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('programmingTestForm');
    const quizContainer = document.getElementById('test-questions');
    const studentNameInput = document.getElementById('studentName');
    const universityInput = document.getElementById('university');
    const courseInput = document.getElementById('major');
    const studentYearInput = document.getElementById('studentYear');
    const studentIdInput = document.getElementById('studentId');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const submitBtn = document.getElementById('submitBtn');
    const resultsContainer = document.getElementById('results');
    const evaluationsDiv = document.getElementById('evaluations');
    const loadingIndicator = document.getElementById('loading');    // --- CONFIGURATION ---
    const GEMINI_API_KEY = 'AIzaSyAiRId_JTLzG1DwLYYG0J3LQCrQoiCmgUo'; //REPLACE WITH YOUR API KEY
    // Google Apps Script web app URL - Make sure to deploy as web app and copy the URL here
    const GOOGLE_SHEET_APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzx7RcxaJfzPi96eGH4TpCcVJpP2gsOcKc23LFMEOK2_7vLzJzYPOGKBbscN_7Z1mz2/exec';
    // Tên sheet trong Google Spreadsheet
    const SHEET_NAME = 'De1'; // Thay đổi tên sheet tsại đây

    // Validate configuration
    if (!GEMINI_API_KEY || GEMINI_API_KEY.trim() === '') {
        console.error("Gemini API key not configured!");
    }

    if (!GOOGLE_SHEET_APP_SCRIPT_URL || !GOOGLE_SHEET_APP_SCRIPT_URL.startsWith('https://script.google.com/macros/s/')) {
        console.error("Invalid Google Sheet App Script URL!");
    }
    // --------------------

    let questionsData = [];

    async function loadQuestions() {
        try {
            questionsData = testData;
            renderQuiz(questionsData);
        } catch (error) {
            console.error("Could not load questions:", error);
            quizContainer.innerHTML = "<p>Lỗi tải câu hỏi. Vui lòng thử lại sau.</p>";
        }
    }

    function renderQuiz(questions) {
        quizContainer.innerHTML = '';
        let partIHtml = '<h2>PHẦN I: CÂU HỎI LÝ THUYẾT</h2>';
        let partIIHtml = '<h2>PHẦN II: CÂU HỎI THỰC HÀNH</h2>';
        let partRendered = {
            I: false,
            II: false
        };

        questions.forEach((q) => {
            const questionNumericId = parseInt(q.id.replace('q', ''));
            const currentQuestionPart = questionNumericId <= 8 ? "I" : "II";

            if (currentQuestionPart === "I" && !partRendered.I) {
                quizContainer.insertAdjacentHTML('beforeend', partIHtml);
                partRendered.I = true;
            } else if (currentQuestionPart === "II" && !partRendered.II) {
                quizContainer.insertAdjacentHTML('beforeend', partIIHtml);
                partRendered.II = true;
            }

            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');

            let questionHtml = `<h3>Câu ${questionNumericId}: ${q.question}</h3>`;

            if (q.type === 'theory-mcq' || q.type === 'theory-tf') {
                questionHtml += '<div class="options">';
                q.options.forEach(option => {
                    questionHtml += `
                        <label>
                            <input type="radio" name="question-${q.id}" value="${option}" required>
                            ${option}
                        </label>
                    `;
                });
                questionHtml += '</div>';
            } else if (q.type === 'practice-code' || q.type === 'practice-text') {
                questionHtml += `<div class="form-group"><textarea name="question-${q.id}" rows="4" cols="50"></textarea></div>`;
            }

            questionDiv.innerHTML = questionHtml;
            quizContainer.appendChild(questionDiv);
        });
    }

    quizForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!studentNameInput.value || !universityInput.value || !courseInput.value || !studentIdInput.value || !studentYearInput.value || !emailInput.value || !phoneInput.value) {
            alert('Vui lòng điền đầy đủ thông tin sinh viên.');
            return;
        }

        submitBtn.disabled = true;
        loadingIndicator.classList.remove('hidden');
        resultsContainer.classList.add('hidden');

        const studentInfo = {
            fullName: studentNameInput.value,
            school: universityInput.value,
            studentId: studentIdInput.value,
            studentYear: studentYearInput.value,
            email: emailInput.value,
            major: courseInput.value,
            phone: phoneInput.value,
            timestamp: new Date().toLocaleString()
        };

        const answers = {};
        let correctAnswersCount = 0;

        questionsData.forEach(question => {
            let studentAnswer = '';
            if (question.type === 'theory-mcq' || question.type === 'theory-tf') {
                const answerInput = quizForm.querySelector(`input[name="question-${question.id}"]:checked`);
                if (answerInput) {
                    studentAnswer = answerInput.value;

                    if (studentAnswer === question.answer) {
                        correctAnswersCount++;
                    }
                }
            } else {
                const textareaInput = quizForm.querySelector(`textarea[name="question-${question.id}"]`);
                if (textareaInput) {
                    studentAnswer = textareaInput.value;
                }
            }
            answers[question.id] = studentAnswer;
        });

        let evaluationResults;
        try {
            evaluationResults = await evaluateAnswers(correctAnswersCount, questionsData.length);
        } catch (error) {
            console.error("Lỗi đánh giá:", error);
            alert("Lỗi trong quá trình đánh giá, vui lòng thử lại sau.");
            submitBtn.disabled = false;
            loadingIndicator.classList.add('hidden');
            return;
        }

        let totalScore = 0;
        let feedbackText = "";

        if (evaluationResults && evaluationResults.results) {
            feedbackText = evaluationResults.results.overallFeedback;
        }

        evaluationsDiv.innerHTML = formatEvaluationResults(feedbackText);
        resultsContainer.classList.remove('hidden');
        submitBtn.disabled = false;
        loadingIndicator.classList.add('hidden');

        const dataToSave = {
            timestamp: studentInfo.timestamp,
            fullName: studentInfo.fullName,
            school: studentInfo.school,
            studentId: studentInfo.studentId,
            studentYear: studentInfo.studentYear,
            email: studentInfo.email,
            major: studentInfo.major,
            phone: studentInfo.phone,
            evaluation: feedbackText,
            score: totalScore,
            ...answers
        };

        try {
            await saveToGoogleSheet(dataToSave);
        } catch (error) {
            console.error("Lỗi lưu dữ liệu:", error);
            alert("Lỗi trong quá trình lưu dữ liệu, vui lòng thử lại sau.");
            submitBtn.disabled = false;
            loadingIndicator.classList.add('hidden');
            return;
        }
    });

    async function evaluateAnswers(correctAnswers, totalQuestions) {

        let encouragingFeedback = `Bạn đã trả lời đúng ${correctAnswers}/${totalQuestions} câu hỏi! Đây là một khởi đầu tốt, hãy tiếp tục cố gắng để phát triển kỹ năng của mình hơn nữa.`;

        return {
            success: true,
            message: "Đánh giá hoàn tất",
            results: {
                overallFeedback: encouragingFeedback
            }
        };
    }

    function formatEvaluationResults(feedbackText) {
        let html = `<p>${feedbackText.replace(/\n/g, '<br>')}</p>`;
        return html;
    }

    async function saveToGoogleSheet(data) {
        console.log('Starting to save data to Google Sheet...');

        if (!GOOGLE_SHEET_APP_SCRIPT_URL || GOOGLE_SHEET_APP_SCRIPT_URL.trim() === '') {
            const error = new Error("Google Sheet App Script URL not configured");
            console.error(error);
            throw error;
        }

        if (!data || typeof data !== 'object') {
            const error = new Error("Invalid data format for Google Sheet");
            console.error(error);
            throw error;
        }

        // Add timestamp if not present
        if (!data.timestamp) {
            data.timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        }

        return new Promise((resolve, reject) => {
            try {                const formData = {
                    'SheetName': SHEET_NAME,
                    'Timestamp': data.timestamp,
                    'FullName': data.fullName,
                    'School': data.school,
                    'StudentID': data.studentId,
                    'StudentYear': data.studentYear,
                    'Email': data.email,
                    'Major': data.major,
                    'Phone': data.phone,
                    'Evaluation': data.evaluation || '',
                    'Score': data.score || '0'
                };

                // Add answers
                for (let i = 1; i <= 20; i++) {
                    const qKey = `q${i}`;
                    formData[`Q${i}`] = data[qKey] || '';
                }

                console.log('Formatted data to send:', formData);

                // Create form
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = GOOGLE_SHEET_APP_SCRIPT_URL;

                const iframeName = 'hidden-iframe-' + Date.now();
                form.target = iframeName;

                // Create and append iframe
                const iframe = document.createElement('iframe');
                iframe.name = iframeName;
                iframe.style.display = 'none';
                document.body.appendChild(iframe);

                // Add form fields
                Object.entries(formData).forEach(([key, value]) => {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = String(value); // Ensure value is a string
                    form.appendChild(input);
                });

                // Handle iframe load event
                let hasLoaded = false;
                iframe.onload = () => {
                    if (!hasLoaded) {
                        hasLoaded = true;
                        console.log('Form submitted successfully');
                        setTimeout(() => {
                            if (document.body.contains(iframe)) {
                                document.body.removeChild(iframe);
                            }
                            if (document.body.contains(form)) {
                                document.body.removeChild(form);
                            }
                            resolve({ status: 'success', message: 'Dữ liệu đã được gửi thành công' });
                        }, 1000);
                    }
                };

                // Handle errors
                iframe.onerror = (error) => {
                    console.error('Error submitting form:', error);
                    if (document.body.contains(iframe)) {
                        document.body.removeChild(iframe);
                    }
                    if (document.body.contains(form)) {
                        document.body.removeChild(form);
                    }
                    reject(new Error('Lỗi khi gửi form'));
                };

                // Append and submit form
                document.body.appendChild(form);
                console.log('Submitting form...');
                form.submit();

                // Timeout handler
                setTimeout(() => {
                    if (!hasLoaded) {
                        if (document.body.contains(iframe)) {
                            document.body.removeChild(iframe);
                        }
                        if (document.body.contains(form)) {
                            document.body.removeChild(form);
                        }
                        resolve({ status: 'success', message: 'Dữ liệu đã được gửi thành công' });
                    }
                }, 5000);
            } catch (error) {
                console.error('Error in form submission:', error);
                reject(error);
            }
        });
    }

    loadQuestions();
});