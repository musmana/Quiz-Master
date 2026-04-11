import { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { sampleQuestions, categories } from '../../data/mock';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Upload,
  X,
  Image as ImageIcon,
  FileText,
  AlertCircle } from
'lucide-react';
import { cn } from '../../lib/utils';
interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation?: string;
  image?: string;
}
export function QuestionManagement() {
  const [questions, setQuestions] = useState<Question[]>(
    sampleQuestions.map((q) => ({
      ...q,
      category: 'tech',
      difficulty: q.id % 2 === 0 ? 'Easy' : 'Medium',
      explanation: '',
      image: ''
    }))
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  // Form State
  const [formData, setFormData] = useState<Partial<Question>>({
    text: '',
    category: 'tech',
    difficulty: 'Easy',
    options: [
    {
      id: 'a',
      text: ''
    },
    {
      id: 'b',
      text: ''
    },
    {
      id: 'c',
      text: ''
    },
    {
      id: 'd',
      text: ''
    }],

    correctAnswer: 'a',
    explanation: '',
    image: ''
  });
  // Filter Logic
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.text.
    toLowerCase().
    includes(searchTerm.toLowerCase());
    const matchesCategory =
    selectedCategory === 'All' || q.category === selectedCategory;
    const matchesDifficulty =
    selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({
      type,
      message
    });
    setTimeout(() => setNotification(null), 3000);
  };
  const handleOpenModal = (question?: Question) => {
    if (question) {
      setCurrentQuestion(question);
      setFormData(question);
    } else {
      setCurrentQuestion(null);
      setFormData({
        text: '',
        category: 'tech',
        difficulty: 'Easy',
        options: [
        {
          id: 'a',
          text: ''
        },
        {
          id: 'b',
          text: ''
        },
        {
          id: 'c',
          text: ''
        },
        {
          id: 'd',
          text: ''
        }],

        correctAnswer: 'a',
        explanation: '',
        image: ''
      });
    }
    setIsModalOpen(true);
  };
  const handleSave = () => {
    if (!formData.text || formData.options?.some((o) => !o.text)) {
      showNotification('error', 'Please fill in all fields');
      return;
    }
    if (currentQuestion) {
      setQuestions(
        questions.map((q) =>
        q.id === currentQuestion.id ?
        {
          ...formData,
          id: q.id
        } as Question :
        q
        )
      );
      showNotification('success', 'Question updated successfully');
    } else {
      const newId = Math.max(...questions.map((q) => q.id)) + 1;
      setQuestions([
      ...questions,
      {
        ...formData,
        id: newId
      } as Question]
      );
      showNotification('success', 'New question added successfully');
    }
    setIsModalOpen(false);
  };
  const handleDelete = () => {
    if (currentQuestion) {
      setQuestions(questions.filter((q) => q.id !== currentQuestion.id));
      showNotification('success', 'Question deleted successfully');
      setIsDeleteModalOpen(false);
      setCurrentQuestion(null);
    }
  };
  const handleUpload = () => {
    // Simulate upload
    setTimeout(() => {
      setIsUploadModalOpen(false);
      showNotification('success', 'Questions imported successfully from CSV');
    }, 1000);
  };
  return (
    <AdminLayout>
      <div className="space-y-6 relative">
        {notification &&
        <div
          className={cn(
            'fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg text-white text-sm font-medium animate-in slide-in-from-top-2',
            notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
          )}>

            {notification.message}
          </div>
        }

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Question Bank</h1>
            <p className="text-slate-500">
              Manage and organize all quiz questions.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setIsUploadModalOpen(true)}>

              <Upload className="h-4 w-4" /> Bulk Upload CSV
            </Button>
            <Button className="gap-2" onClick={() => handleOpenModal()}>
              <Plus className="h-4 w-4" /> Add Question
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search questions..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />

            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <select
                className="h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}>

                <option value="All">All Categories</option>
                {categories.map((c) =>
                <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                )}
              </select>
              <select
                className="h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}>

                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3 font-medium">Question Text</th>
                    <th className="px-6 py-3 font-medium">Category</th>
                    <th className="px-6 py-3 font-medium">Difficulty</th>
                    <th className="px-6 py-3 font-medium">Details</th>
                    <th className="px-6 py-3 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuestions.map((q) =>
                  <tr
                    key={q.id}
                    className="bg-white border-b border-slate-50 hover:bg-slate-50 transition-colors">

                      <td className="px-6 py-4 font-medium text-slate-900 max-w-md truncate">
                        {q.text}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className="capitalize">
                          {q.category}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                        className={
                        q.difficulty === 'Easy' ?
                        'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' :
                        q.difficulty === 'Medium' ?
                        'bg-amber-100 text-amber-700 hover:bg-amber-200' :
                        'bg-red-100 text-red-700 hover:bg-red-200'
                        }>

                          {q.difficulty}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        <div className="flex gap-2">
                          {q.explanation &&
                        <FileText
                          className="h-4 w-4 text-slate-400"
                        />

                        }
                          {q.image &&
                        <ImageIcon
                          className="h-4 w-4 text-slate-400"
                        />

                        }
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-teal-600"
                          onClick={() => handleOpenModal(q)}>

                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-red-600"
                          onClick={() => {
                            setCurrentQuestion(q);
                            setIsDeleteModalOpen(true);
                          }}>

                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
              <span>Showing {filteredQuestions.length} questions</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Modal (Slide-over) */}
        {isModalOpen &&
        <div className="fixed inset-0 z-50 flex justify-end">
            <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)} />

            <div className="relative w-full max-w-lg bg-white h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-slate-900">
                  {currentQuestion ? 'Edit Question' : 'Add New Question'}
                </h2>
                <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600">

                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Question Text <span className="text-red-500">*</span>
                  </label>
                  <textarea
                  className="w-full min-h-25 rounded-md border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  placeholder="Enter your question here..."
                  value={formData.text}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    text: e.target.value
                  })
                  } />

                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Category
                    </label>
                    <select
                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                    value={formData.category}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value
                    })
                    }>

                      {categories.map((c) =>
                    <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                    )}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Difficulty
                    </label>
                    <select
                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                    value={formData.difficulty}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      difficulty: e.target.value
                    })
                    }>

                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium text-slate-700">
                    Options <span className="text-red-500">*</span>
                  </label>
                  {formData.options?.map((option, idx) =>
                <div key={option.id} className="flex items-center gap-3">
                      <input
                    type="radio"
                    name="correctAnswer"
                    checked={formData.correctAnswer === option.id}
                    onChange={() =>
                    setFormData({
                      ...formData,
                      correctAnswer: option.id
                    })
                    }
                    className="h-4 w-4 text-teal-600 focus:ring-teal-600 border-slate-300" />

                      <Input
                    placeholder={`Option ${idx + 1}`}
                    value={option.text}
                    onChange={(e) => {
                      const newOptions = [...(formData.options || [])];
                      newOptions[idx] = {
                        ...option,
                        text: e.target.value
                      };
                      setFormData({
                        ...formData,
                        options: newOptions
                      });
                    }} />

                    </div>
                )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Explanation (Optional)
                  </label>
                  <textarea
                  className="w-full min-h-20 rounded-md border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  placeholder="Explain why the answer is correct..."
                  value={formData.explanation}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    explanation: e.target.value
                  })
                  } />

                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Image/Video URL (Optional)
                  </label>
                  <Input
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.value
                  })
                  } />

                  {formData.image &&
                <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 h-40 bg-slate-50 flex items-center justify-center">
                      <img
                    src={formData.image}
                    alt="Preview"
                    className="h-full object-contain"
                    onError={(e) =>
                    e.currentTarget.src =
                    'https://via.placeholder.com/400x200?text=Invalid+Image+URL'
                    } />

                    </div>
                }
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 sticky bottom-0 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Question</Button>
              </div>
            </div>
          </div>
        }

        {/* Upload Modal */}
        {isUploadModalOpen &&
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsUploadModalOpen(false)} />

            <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Bulk Upload Questions
                </h2>
                <button onClick={() => setIsUploadModalOpen(false)}>
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="h-12 w-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-slate-900">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  CSV files only (max 5MB)
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center text-xs text-slate-500">
                <span>
                  Supported format: Question, Option A, Option B, Option C,
                  Option D, Correct Answer
                </span>
                <a href="#" className="text-teal-600 hover:underline">
                  Download Template
                </a>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button
                variant="outline"
                onClick={() => setIsUploadModalOpen(false)}>

                  Cancel
                </Button>
                <Button onClick={handleUpload}>Upload CSV</Button>
              </div>
            </div>
          </div>
        }

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen &&
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsDeleteModalOpen(false)} />

            <div className="relative w-full max-w-sm bg-white rounded-xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="h-12 w-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Delete Question?
                </h2>
                <p className="text-sm text-slate-500 mt-2">
                  Are you sure you want to delete this question? This action
                  cannot be undone.
                </p>
                {currentQuestion &&
              <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm text-slate-700 w-full text-left border border-slate-200">
                    <span className="font-medium">Question:</span>{' '}
                    {currentQuestion.text}
                  </div>
              }
              </div>
              <div className="flex gap-3">
                <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsDeleteModalOpen(false)}>

                  Cancel
                </Button>
                <Button
                variant="destructive"
                className="flex-1"
                onClick={handleDelete}>

                  Delete
                </Button>
              </div>
            </div>
          </div>
        }
      </div>
    </AdminLayout>);

}