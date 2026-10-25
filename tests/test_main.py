"""验证问候函数及实际命令行入口。"""

import os
from pathlib import Path
import subprocess
import sys
import unittest

from main import greet


PROJECT_ROOT = Path(__file__).resolve().parents[1]


def run_cli(*args: str) -> subprocess.CompletedProcess[str]:
    env = os.environ.copy()
    env["PYTHONIOENCODING"] = "utf-8"
    return subprocess.run(
        [sys.executable, str(PROJECT_ROOT / "main.py"), *args],
        capture_output=True,
        text=True,
        encoding="utf-8",
        env=env,
        check=False,
    )


class GreetingTests(unittest.TestCase):
    def test_default_greeting(self):
        self.assertEqual(greet(), "你好，世界！")

    def test_name_is_trimmed(self):
        self.assertEqual(greet("  小明\t"), "你好，小明！")

    def test_empty_name_is_rejected(self):
        for name in ("", " \t\n"):
            with self.subTest(name=name):
                with self.assertRaisesRegex(ValueError, "姓名不能为空"):
                    greet(name)

    def test_command_line_greetings(self):
        for args, expected in (((), "你好，世界！"), ((" 小明 ",), "你好，小明！")):
            with self.subTest(args=args):
                result = run_cli(*args)
                self.assertEqual(result.returncode, 0)
                self.assertEqual(result.stdout.strip(), expected)
                self.assertEqual(result.stderr, "")

    def test_command_line_empty_name_fails(self):
        result = run_cli(" ")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("姓名不能为空", result.stderr)
        self.assertEqual(result.stdout, "")


if __name__ == "__main__":
    unittest.main()
